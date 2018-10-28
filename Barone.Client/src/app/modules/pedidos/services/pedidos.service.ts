import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/core.module.export';
import { PedidoModel } from '../../shared/models/pedido.model';
import { Observable } from 'rxjs';
import { EntregasAgrupadasModel } from '../../shared/models/entregas-agrupadas.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private _httpClient: HttpClientService) { }
  public getAll(): Observable<PedidoModel[]> {
    return this._httpClient.get<PedidoModel[]>('PedidoModels');
  }

  public filtrar(model: PedidoModel): Observable<PedidoModel[]> {
    return this._httpClient.post<PedidoModel, PedidoModel[]>('FiltrarPedidos', model);
  }

  public GroupByClient(model: PedidoModel): Observable<EntregasAgrupadasModel[]> {
    return this._httpClient.post<PedidoModel, EntregasAgrupadasModel[]>('MovimientosModelsGroupByClient', model);
  }

  public updateByEntrega(model: PedidoModel): Observable<void> {

    return this._httpClient.patch<PedidoModel, void>('PedidoModels', model);
  }
  public update(model: PedidoModel): Observable<void> {
    return this._httpClient.put<PedidoModel, void>('PedidoModels', model);
  }
  public insert(model: PedidoModel): Observable<PedidoModel> {
    return this._httpClient.post<PedidoModel, PedidoModel>('PedidoModels', model);
  }
  public delete(idPedido: number): Observable<PedidoModel> {
    return this._httpClient.delete<PedidoModel>(`PedidoModels/${idPedido}`);
  }
}
