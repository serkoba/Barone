import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest, HttpInterceptor, HttpEvent, HttpHandler } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {
  constructor(private _loader: LoaderService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loader.start();

    return next
      .handle(req)
      .pipe(tap(event => {
        if (event instanceof HttpResponse) {
          this._loader.stop();
        }
      }));
  }
}