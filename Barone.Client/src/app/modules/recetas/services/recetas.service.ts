import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/core.module.export';
import { Observable } from 'rxjs';
import { RecetaModel } from '../../shared/models/receta/receta.model';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  constructor(private _httpClient: HttpClientService) { }

  public getAll(): Observable<RecetaModel[]> {
    return this._httpClient.get<RecetaModel[]>('RecetaModels');
  }
  public getById(idReceta: number): Observable<RecetaModel> {
    return this._httpClient.get<RecetaModel>(`RecetaModels/${idReceta}`);
  }

  public update(model: RecetaModel): Observable<void> {
    return this._httpClient.put<RecetaModel, void>('RecetaModels', model);
  }
  public insert(model: RecetaModel): Observable<RecetaModel> {
    return this._httpClient.post<RecetaModel, RecetaModel>('RecetaModels', model);
  }
  public delete(idReceta: number): Observable<RecetaModel> {
    return this._httpClient.delete<RecetaModel>(`RecetaModels/${idReceta}`);
  }
}
