import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { FrameworkConfiguration } from '../models/framework-configuration';

@Injectable()
export class FrameworkConfigurationService {

  public configuration: FrameworkConfiguration;

  constructor() {
    this.configuration = Object.freeze(new FrameworkConfiguration({
      production: environment.production,
      apiUrl: environment.apiUrl,
      loginUrl: environment.loginUrl,
      logoutUrl: environment.logoutUrl,
      logoUrl: environment.logoUrl,
      rootStore: environment.rootStore,
      relativeRoot: environment.relativeRoot,
      cachePrefix: environment.cachePrefix,
      backgroundLogin: environment.backgroundLogin
    }));
  }

}