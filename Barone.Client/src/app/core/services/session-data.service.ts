import { Injectable } from '@angular/core';
import { Initializable } from '../models/initializable';
import { SessionData } from '../models/session-data';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService  implements Initializable{

    private static SessionKey = 'Session';
  
    private _initialized = false;
    private _sessionData: SessionData = new SessionData();
  
    constructor(private _cache: CacheService) { }
  
    public static factory(cache: CacheService): SessionDataService {
      const sessionDataService = new SessionDataService(cache);
      sessionDataService.initialize();
  
      return sessionDataService;
    }
  
    public initialize(): void {
      if (this._initialized) {
        return;
      }
  
      this._sessionData = this._cache.get<SessionData>(SessionDataService.SessionKey) || new SessionData();
      this._initialized = true;
    }
  
    public loggedIn(): boolean {
      return this._sessionData.authToken !== '';
    }
  
    public logIn(authToken: string, userName: string,role:string): void {
      this._sessionData.authToken = authToken;
      this._sessionData.userName = userName;
      this._sessionData.roles= [];
      this._sessionData.roles.push(role);
  
      this.saveSession();
    }
  
    public logOff(): void {
      this._sessionData = new SessionData();
      this.saveSession();
    }
  
    public getValue<K extends keyof SessionData>(key: K): SessionData[K] {
      return this._sessionData[key];
    }
  
    public setValue<K extends keyof SessionData>(key: K, value: SessionData[K]) {
      this._sessionData[key] = value;
  
      this.saveSession();
    }
  
    public hasRole(role: string): boolean {
      return this.getValue('roles').find(r => r.toLowerCase() === role) !== undefined;
    }
  
    public hasRoles(roles: string[]): boolean {
      return roles.every(r => this.hasRole(r));
    }
  
    private saveSession(): void {
      this._cache.set(SessionDataService.SessionKey, this._sessionData);
    }
  }
  