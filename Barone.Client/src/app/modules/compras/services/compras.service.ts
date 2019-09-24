import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/core.module.export';
import { ComprasModel } from '../../shared/models/compras.model';
import { Observable } from 'rxjs';
import { InsumosService } from '../../insumos/services/insumos.service';
import { OperationsStock } from 'src/app/core/enum/enum.enum';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  constructor(private _httpClient: HttpClientService,
    private insumosServices: InsumosService) { }
  public UpdateStock(operation: OperationsStock, model: ComprasModel): Observable<void> {
    switch (operation) {
      case OperationsStock.Add:
        model.Insumo.Stock = +model.Insumo.Stock + +model.Cantidad;
        break;
      case OperationsStock.Substract:
        model.Insumo.Stock = +model.Insumo.Stock - +model.Cantidad;
        break;
      default:
        break;
    }

    return this.insumosServices.update(model.Insumo);

  }
  public getAll(): Observable<ComprasModel[]> {
    return this._httpClient.get<ComprasModel[]>('ComprasModels');
  }

  public update(model: ComprasModel): Observable<void> {
    return this._httpClient.put<ComprasModel, void>('ComprasModels', model);
  }
  public insert(model: ComprasModel): Observable<ComprasModel> {
    return this._httpClient.post<ComprasModel, ComprasModel>('ComprasModels', model);
  }
  public delete(idCompra: number): Observable<ComprasModel> {
    return this._httpClient.delete<ComprasModel>(`ComprasModels/${idCompra}`);
  }
}