import { Injectable } from '@angular/core';
import { PagosModel } from '../../shared/models/pagos.model';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../../core/core.module.export';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  constructor(private _httpClient: HttpClientService) { }

  public getAll():Observable<PagosModel[]>{
    return this._httpClient.get<PagosModel[]>('PagoModels');
  }

  public update(model:PagosModel):Observable<void>{
    return this._httpClient.put<PagosModel,void>('PagoModels',model);
  }
  public insert(model:PagosModel):Observable<PagosModel>{
    return this._httpClient.post<PagosModel,PagosModel>('PagoModels',model);
  }
  public delete(idpago:number):Observable<PagosModel>{
    return this._httpClient.delete<PagosModel>(`PagoModels/${idpago}`);
  }
}
