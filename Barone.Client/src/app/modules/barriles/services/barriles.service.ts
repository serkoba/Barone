import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/core.module.export';
import { Observable } from 'rxjs';
import { BarrilModel } from '../../shared/models/barril.model';

@Injectable({
  providedIn: 'root'
})
export class BarrilesService {
  constructor(private _httpClient: HttpClientService) { }

  public getAll():Observable<BarrilModel[]>{
    return this._httpClient.get<BarrilModel[]>('BarrilModels');
  }

  public update(model:BarrilModel):Observable<void>{
    return this._httpClient.put<BarrilModel,void>('BarrilModels',model);
  }

  public updatePartial(model:BarrilModel):Observable<void>{
    return this._httpClient.patch<BarrilModel,void>('BarrilModels',model);
  }
  public insert(model:BarrilModel):Observable<BarrilModel>{
    return this._httpClient.post<BarrilModel,BarrilModel>('BarrilModels',model);
  }
  public delete(idBarril:number):Observable<BarrilModel>{
    return this._httpClient.delete<BarrilModel>(`BarrilModels/${idBarril}`);
  }
}
