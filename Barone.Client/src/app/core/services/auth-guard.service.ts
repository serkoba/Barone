import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FrameworkConfigurationService } from './framework-configuration.service';
import { SessionDataService } from './session-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private _configuration: FrameworkConfigurationService,
    private _session: SessionDataService,
    private _router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this._session.loggedIn()) {
      this._router.navigateByUrl(this._configuration.configuration.loginUrl);
    }

    return this._session.loggedIn();
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}