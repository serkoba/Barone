import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/core.module.export';
import { FermentadorModel } from '../../shared/models/fermentador.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FermentadorService {
  constructor(private _httpClient: HttpClientService) { }

  public getAll(): Observable<FermentadorModel[]> {
    return this._httpClient.get<FermentadorModel[]>('FermentadorModels');
  }

  public Filtrar(model: FermentadorModel): Observable<FermentadorModel[]> {
    return this._httpClient.post<FermentadorModel, FermentadorModel[]>('FermentadorModels', model);
  }

  public update(model: FermentadorModel): Observable<void> {
    return this._httpClient.put<FermentadorModel, void>('FermentadorModels', model);
  }
  public insert(model: FermentadorModel): Observable<FermentadorModel> {
    return this._httpClient.post<FermentadorModel, FermentadorModel>('FermentadorModels', model);
  }
  public delete(idpago: number): Observable<FermentadorModel> {
    return this._httpClient.delete<FermentadorModel>(`FermentadorModels/${idpago}`);
  }

  public embarrilar(model: FermentadorModel): Observable<void> {
    return this._httpClient.post<FermentadorModel, void>('Embarrilar', model);
  }
}