import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/core.module.export';
import { Observable } from 'rxjs';
import { EntregaModel } from '../../shared/models/entrega.model';
import { ReportFilterModel } from '../../shared/models/reporte-filtro.model';
import { MovimientosAgrupadosModel } from '../../shared/models/movimientos-agrupados.model';
import { EntregasAgrupadasByClienteModel, DetalleEntregas } from '../../shared/models/entregas-agrupadas.model';

@Injectable({
  providedIn: 'root'
})
export class EntregasService {

  constructor(private _httpClient: HttpClientService) { }
  public getAll(): Observable<EntregaModel[]> {
    return this._httpClient.get<EntregaModel[]>('MovimientosModels');
  }

  public MovimientosXFecha(model: ReportFilterModel): Observable<MovimientosAgrupadosModel[]> {
    return this._httpClient.post<ReportFilterModel,MovimientosAgrupadosModel[]>('MovimientosAgrupados',model);
  }

  public filtrar(model: ReportFilterModel): Observable<EntregaModel[]> {
    return this._httpClient.post<ReportFilterModel, EntregaModel[]>('FiltrarMovimientos', model);
  }
  public MovimientosXEstilosXCliente(model: ReportFilterModel): Observable<EntregasAgrupadasByClienteModel[]> {
    return this._httpClient.post<ReportFilterModel, EntregasAgrupadasByClienteModel[]>('MovimientosModelsGroupByClientEstilos', model);
  }

  public MovimientosXEstilos(model: ReportFilterModel): Observable<DetalleEntregas[]> {
    return this._httpClient.post<ReportFilterModel, DetalleEntregas[]>('MovimientosModelsGroupByEstilos', model);
  }

  public MovimientosByCliente(model: ReportFilterModel): Observable<DetalleEntregas[]> {
    return this._httpClient.post<ReportFilterModel, DetalleEntregas[]>('MovimientosByCliente', model);
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
