import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/core.module.export';
import { Observable } from 'rxjs';
import { EntregaModel } from '../../shared/models/entrega.model';

@Injectable({
  providedIn: 'root'
})
export class EntregasService {

  constructor(private _httpClient: HttpClientService) { }
  public getAll(): Observable<EntregaModel[]> {
    return this._httpClient.get<EntregaModel[]>('MovimientosModels');
  }

  public filtrar(model: EntregaModel): Observable<EntregaModel[]> {
    return this._httpClient.post<EntregaModel, EntregaModel[]>('FiltrarMovimientos', model);
  }

  public update(model: EntregaModel): Observable<void> {
    return this._httpClient.put<EntregaModel, void>('MovimientosModels', model);
  }
  public insert(model: EntregaModel): Observable<EntregaModel> {
    return this._httpClient.post<EntregaModel, EntregaModel>('MovimientosModels', model);
  }
  public delete(idEntrega: number): Observable<EntregaModel> {
    return this._httpClient.delete<EntregaModel>(`MovimientosModels/${idEntrega}`);
  }
}
