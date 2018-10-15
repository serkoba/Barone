import { Injectable } from '@angular/core';
import { FrameworkConfigurationService } from './framework-configuration.service';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';
import { SessionDataService } from './session-data.service';
import { LoginResponse } from '../models/login.response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _configuration: FrameworkConfigurationService,
    private _session: SessionDataService,
    private _http: HttpClientService) { }

  public login(userName: string, password: string): Observable<LoginResponse> {
    return Observable.create(observer => {

      const data = new URLSearchParams();

      data.append('grant_type', 'password');
      data.append('username', userName);
      data.append('password', password);

      this._http.post<string, LoginResponse>('token', data.toString())
        .pipe(
          map(tokenResponse => {
            if (tokenResponse.error != null) {
              throw new Error(tokenResponse.error);
            }

            this._session.logIn(tokenResponse.access_token, userName, tokenResponse.role);
            observer.next(tokenResponse);
            observer.complete();
            // return this._http.get<{ Nodes: NavigationNode[], CustomerId: string, Roles: string[], FullName: string, UserId: string,UserCompany:string }>
            //   (this._configuration.configuration.navigationUrl);
          })
        ).subscribe(() => { }
          , error => {
            throw new Error(error);
          })
      // .subscribe(authResponse => {
      //   const loginResponse = new LoginResponse({ success: true });

      //   this._session.setValue('navigation', authResponse.Nodes);
      //   this._session.setValue('customerId', authResponse.CustomerId);
      //   this._session.setValue('roles', authResponse.Roles);
      //   this._session.setValue('fullName', authResponse.FullName);
      //   this._session.setValue('userId', authResponse.UserId);
      //   this._session.setValue('userCompany',authResponse.UserCompany);

      // });
    });
  }
}
