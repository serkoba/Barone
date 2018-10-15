import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loaders = 0;
  private _loading = false;
  private _status: Subject<boolean> = new Subject();
  private _statusMessage: Subject<string> = new Subject();
  public status: Observable<boolean> = this._status.asObservable();
  public statusMessage: Observable<string> = this._statusMessage.asObservable();

  public get loading(): boolean {
    return this._loading;
  }

  public set loading(v: boolean) {
    this._loading = v;
    this._status.next(v);
  }

  public setMessage(message: string) {
    this._statusMessage.next(message);
  }

  public start(): void {
    this._loaders++;

    if (this._loaders === 1) {
      this.loading = true;
    }
  }

  public stop(force: boolean = false): void {
    this._loaders--;

    if (this._loaders <= 0 || force) {
      this._loaders = 0;
      this.setMessage('');
      this.loading = false;
    }
  }
}
