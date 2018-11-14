import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/core.module.export';
import { Observable } from 'rxjs';
import { InsumoModel } from '../../shared/models/insumo.model';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {
  constructor(private _httpClient: HttpClientService) { }

  public getAll(): Observable<InsumoModel[]> {
    return this._httpClient.get<InsumoModel[]>('InsumoModels');
  }

  public Filtrar(model: InsumoModel): Observable<InsumoModel[]> {
    return this._httpClient.post<InsumoModel, InsumoModel[]>('InsumoModels', model);
  }

  public update(model: InsumoModel): Observable<void> {
    return this._httpClient.put<InsumoModel, void>('InsumoModels', model);
  }
  public insert(model: InsumoModel): Observable<InsumoModel> {
    return this._httpClient.post<InsumoModel, InsumoModel>('InsumoModels', model);
  }
  public delete(idInsumo: number): Observable<InsumoModel> {
    return this._httpClient.delete<InsumoModel>(`InsumoModels/${idInsumo}`);
  }
}
