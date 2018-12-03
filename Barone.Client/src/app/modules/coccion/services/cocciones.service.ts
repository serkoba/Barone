import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { Observable } from 'rxjs';
import { CoccionModel } from '../../shared/models/coccion/coccion.model';
import { SelectItem } from 'src/app/core/models/select-item';
import { ReportFilterModel } from '../../shared/models/reporte-filtro.model';

@Injectable({
  providedIn: 'root'
})
export class CoccionesService {
  constructor(private _httpClient: HttpClientService) { }

  public getAll(): Observable<CoccionModel[]> {
    return this._httpClient.get<CoccionModel[]>('CoccionModels');
  }
  public getNroLoteAllCocciones(): Observable<SelectItem[]> {
    return this._httpClient.get<SelectItem[]>('getAllNroLote');
  }

  public Filtrar(model: ReportFilterModel): Observable<CoccionModel[]> {
    return this._httpClient.post<ReportFilterModel, CoccionModel[]>('FiltrarCoccionModel', model);
  }

  public update(model: CoccionModel): Observable<void> {
    return this._httpClient.put<CoccionModel, void>('CoccionModels', model);
  }
  public insert(model: CoccionModel): Observable<CoccionModel> {

    return this._httpClient.post<CoccionModel, CoccionModel>('CoccionModels', model);
  }
  public delete(idInsumo: number): Observable<CoccionModel> {
    return this._httpClient.delete<CoccionModel>(`CoccionModels/${idInsumo}`);
  }
}
