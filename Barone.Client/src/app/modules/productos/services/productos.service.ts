import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/core.module.export';
import { Observable } from 'rxjs';
import { ProductosModel, StockProductos } from '../../shared/models/productos.model';
import { ReportFilterModel } from '../../shared/models/reporte-filtro.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(private _httpClient: HttpClientService) { }

  public getAll(): Observable<ProductosModel[]> {
    return this._httpClient.get<ProductosModel[]>('ProductoModels');
  }
  public getAllDetail():Observable<ProductosModel[]>{
    return this._httpClient.get<ProductosModel[]>('ProductoModelsDetail');
  }
  public filtrar(model: ReportFilterModel): Observable<ProductosModel[]> {
    return this._httpClient.post<ReportFilterModel, ProductosModel[]>('ProductoModels', model);
  }

  public update(model: ProductosModel): Observable<void> {
    return this._httpClient.put<ProductosModel, void>('ProductoModels', model);
  }

  public updateAll(model: StockProductos): Observable<void> {
    return this._httpClient.post<StockProductos, void>('UpdateAllProductos', model);
  }

  public updatePartial(model: ProductosModel): Observable<void> {
    return this._httpClient.patch<ProductosModel, void>('ProductoModels', model);
  }

  public updatePartialStockProducto(model: StockProductos): Observable<void> {
    return this._httpClient.post<StockProductos, void>('UpdatePartialStockProducto', model);
  }
  public insert(model: ProductosModel): Observable<ProductosModel> {
    return this._httpClient.post<ProductosModel, ProductosModel>('ProductoModels', model);
  }
  public delete(idBarril: number): Observable<ProductosModel> {
    return this._httpClient.delete<ProductosModel>(`ProductoModels/${idBarril}`);
  }
}
