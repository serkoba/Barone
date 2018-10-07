import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/core.module.export';
import { Observable } from 'rxjs';
import { RangoModel } from '../../shared/models/rango.model';

@Injectable({
  providedIn: 'root'
})
export class RangosService {
  constructor(private _httpClient: HttpClientService) { }

  public getAll():Observable<RangoModel[]>{
    return this._httpClient.get<RangoModel[]>('rangosPreciosModels');
  }

  public update(model:RangoModel):Observable<void>{
    return this._httpClient.put<RangoModel,void>('rangosPreciosModels',model);
  }
  public insert(model:RangoModel):Observable<RangoModel>{
    return this._httpClient.post<RangoModel,RangoModel>('rangosPreciosModels',model);
  }
  public delete(idRango:number):Observable<RangoModel>{
    return this._httpClient.delete<RangoModel>(`rangosPreciosModels/${idRango}`);
  }
}
