import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FrameworkConfigurationService } from './framework-configuration.service';



@Injectable()
export class CacheService {
  constructor(private _configuration: FrameworkConfigurationService) { }

  public get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(this.getKey(key))) as T;
  }

  public getFromCacheOrRequest<T>(key: string, requester: () => Observable<T>): Observable<T> {
    const cachedValue = this.get<T>(key);

    if (cachedValue == null) {
      return requester().pipe(tap(data => this.set(key, data)));
    }

    return Observable.create(observer => {
      observer.next(cachedValue);
      observer.complete();
    });
  }

  public set<T>(key: string, value: T): void {
    localStorage.setItem(this.getKey(key), JSON.stringify(value));
  }

  public remove(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  private getKey(key: string): string {
    return `${this._configuration.configuration.cachePrefix}_cache_${key}`;
  }
}
