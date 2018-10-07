import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionDataService } from './session-data.service';
import { Observable,throwError  } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';




@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor(private _session: SessionDataService, private _route: Router) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
    let nextReq = req;
    if (this._session.loggedIn()) {
      nextReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + this._session.getValue('authToken') } });
    }
     return next.handle(nextReq).pipe(tap(() => {
      if (event instanceof HttpResponse) {
        // success
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
        //  authService.removeTokens();
        //redirect to the signin page or show login modal here
        this._session.logOff();
        this._route.navigateByUrl('/login'); 
        return throwError(err);
        
        }
      }
    }));
  }

  // handle401Error(req: HttpRequest<any>, next: HttpHandler) {
  //  this._route.navigateByUrl('/Login');
  // return Observable.throw('error 401');
  // }
}
