import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/core.module.export';
import { ClientsModel } from '../../shared/models/clients.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private _httpClient: HttpClientService) { }

  public getAll():Observable<ClientsModel[]>{
    return this._httpClient.get<ClientsModel[]>('ClientesModels');
  }
  
  public update(model:ClientsModel):Observable<void>{
    return this._httpClient.put<ClientsModel,void>('ClientesModels',model);
  }
  public insert(model:ClientsModel):Observable<ClientsModel>{
    return this._httpClient.post<ClientsModel,ClientsModel>('ClientesModels',model);
  }
  public delete(idCliente:number):Observable<ClientsModel>{
    return this._httpClient.delete<ClientsModel>(`ClientesModels/${idCliente}`);
  }
}
