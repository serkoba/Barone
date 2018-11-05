import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { ProveedoresModel } from '../../shared/models/proveedor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  constructor(private _httpClient: HttpClientService) { }

  public getAll(): Observable<ProveedoresModel[]> {
    return this._httpClient.get<ProveedoresModel[]>('ProveedoresModels');
  }

  public Filtrar(model: ProveedoresModel): Observable<ProveedoresModel[]> {
    return this._httpClient.post<ProveedoresModel, ProveedoresModel[]>('ProveedoresModels', model);
  }

  public update(model: ProveedoresModel): Observable<void> {
    return this._httpClient.put<ProveedoresModel, void>('ProveedoresModels', model);
  }
  public insert(model: ProveedoresModel): Observable<ProveedoresModel> {
    return this._httpClient.post<ProveedoresModel, ProveedoresModel>('ProveedoresModels', model);
  }
  public delete(idpago: number): Observable<ProveedoresModel> {
    return this._httpClient.delete<ProveedoresModel>(`ProveedoresModels/${idpago}`);
  }
}
