import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/core.module.export';
import { PedidoModel } from '../../shared/models/pedido.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private _httpClient: HttpClientService) { }
  public getAll(): Observable<PedidoModel[]> {
      return this._httpClient.get<PedidoModel[]>('PedidoModels');
    }

    public update(model:PedidoModel):Observable<void>{
      return this._httpClient.put<PedidoModel,void>('PedidoModels',model);
    }
    public insert(model:PedidoModel):Observable<PedidoModel>{
      return this._httpClient.post<PedidoModel,PedidoModel>('PedidoModels',model);
    }
    public delete(idPedido:number):Observable<PedidoModel>{
      return this._httpClient.delete<PedidoModel>(`PedidoModels/${idPedido}`);
    }
}
