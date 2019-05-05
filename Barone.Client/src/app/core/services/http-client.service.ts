import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { isNullOrUndefined } from 'util';
import { FrameworkConfigurationService } from './framework-configuration.service';
import { Observable, Observer } from 'rxjs';
import { ValidationUtilities } from '../utilities/validation.utilities';
import { SessionDataService } from './session-data.service';
import { LoaderService } from './loader.service';
import { SnackManagerService } from './snack-manager.service';


@Injectable()
export class HttpClientService {
  public BaseUrl: string;

  constructor(private _http: HttpClient, private _config: FrameworkConfigurationService,
    private _snack: SnackManagerService,
    private _loader: LoaderService,
    private _session: SessionDataService) {
    this.BaseUrl = _config.configuration.apiUrl;
  }

  public downloadFile(url: string, mimeType: string): Observable<Blob> {
    return Observable.create(observer => {
      this._http.get(this.getUrl(url),
        {
          headers: new HttpHeaders({ 'Content-Type': mimeType, 'Accept': mimeType }),
          observe: 'response',
          responseType: 'blob',
        })
        .subscribe(response => this.processHttpResponse(response, observer, url),
          error => this.processHttpError(observer, url, error),
          () => observer.complete());
    });
  }

  public get<TResponse>(url: string): Observable<TResponse> {
    return Observable.create(observer => {
      this._http.get(this.getUrl(url), { observe: 'response', responseType: 'text' })
        .subscribe(response => this.processHttpResponse(response, observer, url),
          error => this.processHttpError(observer, url, error),
          () => observer.complete());
    });
  }

  public getMap<TResponse, TMappedResponse>(url: string, mapper: (response: TResponse) => TMappedResponse): Observable<TMappedResponse> {
    return Observable.create(observer => {
      this._http.get(this.getUrl(url), { observe: 'response', responseType: 'text' })
        .subscribe(response => this.processHttpResponse(response, observer, url, mapper),
          error => this.processHttpError(observer, url, error),
          () => observer.complete());
    });
  }

  public post<TRequest, TResponse>(url: string, body: TRequest): Observable<TResponse> {
    //  let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return Observable.create(observer => {
      this._http.post(this.getUrl(url), body, { observe: 'response', responseType: 'text' })
        .subscribe(response => this.processHttpResponse(response, observer, url),
          error => this.processHttpError(observer, url, error),
          () => observer.complete());
    });
  }

  public put<TRequest, TResponse>(url: string, body: TRequest): Observable<TResponse> {

    return Observable.create(observer => {
      this._http.put(this.getUrl(url), body, { observe: 'response', responseType: 'text' })
        .subscribe(response => this.processHttpResponse(response, observer, url),
          error => this.processHttpError(observer, url, error),
          () => observer.complete());
    });
  }

  public patch<TRequest, TResponse>(url: string, body: TRequest): Observable<TResponse> {

    return Observable.create(observer => {
      this._http.patch(this.getUrl(url), body, { observe: 'response', responseType: 'text' })
        .subscribe(response => this.processHttpResponse(response, observer, url),
          error => this.processHttpError(observer, url, error),
          () => observer.complete());
    });
  }

  public postMap<TRequest, TResponse, TMappedResponse>(
    url: string,
    body: TRequest,
    mapper: (response: TResponse) => TMappedResponse): Observable<TMappedResponse> {

    return Observable.create(observer => {
      this._http.post(this.getUrl(url), body, { observe: 'response', responseType: 'text' })
        .subscribe(response => this.processHttpResponse(response, observer, url, mapper),
          error => this.processHttpError(observer, url, error),
          () => observer.complete());
    });
  }

  public postFile(url: string, file: Blob, filename: string): Observable<any> {
    return Observable.create(observer => {
      const formData = new FormData();
      formData.append('file', file, filename);
      this._http.post(url, formData, { observe: 'response', responseType: undefined })
        .subscribe(response => {
          observer.next(response);
          observer.complete();
        },
          error => this.processHttpError(observer, url, error),
          () => observer.complete());
    });
  }

  public delete<TResponse>(url: string): Observable<TResponse> {

    return Observable.create(observer => {
      this._http.delete(this.getUrl(url), { observe: 'response', responseType: 'text' })
        .subscribe(response => this.processHttpResponse(response, observer, url),
          error => this.processHttpError(observer, url, error),
          () => observer.complete());
    });
  }


  public processHtmlErrorResponse(htmlBody: string, notifier: (error: Error) => void): boolean {
    if (htmlBody.trim().includes('<html')) { // HTML response
      const errorMessage = this.extractErrorMessageFromHtmlResponse(htmlBody);

      if (errorMessage.includes('401.')) {
        try {
          throw new HttpErrorResponse({ status: 401, statusText: errorMessage });
        } catch (e) {
          notifier(e);
        }
        return true;
      }

      try {
        throw new Error(errorMessage);
      } catch (e) {
        notifier(e);
      }

      return true;
    }

    return false;
  }

  public processJsonErrorResponse(jsonObject: any, notifier: (error: Error) => void): boolean {
    if (!isNullOrUndefined(jsonObject)
      && (!isNullOrUndefined(jsonObject.length)
        && jsonObject.length === 1
        && !isNullOrUndefined(jsonObject[0]) && !isNullOrUndefined(jsonObject[0].Message))
      || (!isNullOrUndefined(jsonObject['Message']))) { // Json Error response

      try {
        throw new Error(!isNullOrUndefined(jsonObject[0]) ? jsonObject[0].Message : jsonObject.Message);
      } catch (e) {
        notifier(e);
      }

      return true;
    }

    return false;
  }


  public getUrl(url: string): string {
    return this.BaseUrl + '/' + url;
  }

  private processHttpResponse<TResponse, TMappedResponse>(
    response: HttpResponse<any>,
    observer: Observer<any>,
    url: string,
    mapper?: (response: TResponse) => TMappedResponse) {

    if (response instanceof HttpErrorResponse) {
      if (response.status === 401) {
        this.processHttpError(observer, url, response);
        this._session.logOff();
        return;
      }
    }

    const contentType = response.headers.get('Content-Type');
    const isTextResponse = !ValidationUtilities.isNullOrWhitespace(contentType) && (contentType.includes('json') || contentType.includes('text'));

    if (isTextResponse && !ValidationUtilities.isNullOrWhitespace(response.body)) {
      if (this.processHtmlErrorResponse(response.body, (e) => this.processHttpError(observer, url, e))) {
        return;
      }

      const responseJson = JSON.parse(response.body);
      if (this.processJsonErrorResponse(responseJson, (e) => this.processHttpError(observer, url, e))) {
        return;
      }

      observer.next(mapper === undefined ? <TResponse>responseJson : mapper(<TResponse>responseJson));
      return;
    } else if (response.status === 200 && !isTextResponse) {
      // Empty or binary response

      observer.next(response.body);

      return;
    }

    // Unidentified response
    observer.error(new Error(`Cannot process server response from ${url}. Response received: ${response.body}`));
  }

  private convertStringToBlob(data: string, contentType: string, sliceSize: number = 512) {
    // https://stackoverflow.com/a/16245768
    const byteArrays = [];

    for (let offset = 0; offset < data.length; offset += sliceSize) {
      const slice = data.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  private extractErrorMessageFromHtmlResponse(htmlBody: string): string {
    let errorMessage = '';

    // Best effort to get the errorMessage;
    try {
      errorMessage = htmlBody.substring(htmlBody.indexOf('Error message '), htmlBody.indexOf('<br>', htmlBody.indexOf('Error message ')));
    } catch (e) {
      errorMessage = 'Unspecified error';
    }

    return errorMessage;
  }

  private processHttpError(observer: Observer<any>, url: string, error: any): void {
    this._loader.stop();
    var errorMessage = JSON.parse(error.error);
    this._snack.openSnackBar(errorMessage.Message, 'Error');
    error.url = this.getUrl(url);
///REVISAR ESTA LINEA PARA VER DONDE SE PINTA Y ACOMODARLO.
    //observer.error(error);
  }
}
