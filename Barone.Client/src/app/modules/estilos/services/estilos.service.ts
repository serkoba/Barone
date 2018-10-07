import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../core/core.module.export';
import { Observable } from 'rxjs';
import { EstilosModel } from '../../shared/models/estilos.model';

@Injectable({
  providedIn: 'root'
})
export class EstilosService {
  constructor(private _httpClient: HttpClientService) { }

  public getAll():Observable<EstilosModel[]>{
    return this._httpClient.get<EstilosModel[]>('EstilosModels');
  }

  public update(model:EstilosModel):Observable<void>{
    return this._httpClient.put<EstilosModel,void>('EstilosModels',model);
  }
  public insert(model:EstilosModel):Observable<EstilosModel>{
    return this._httpClient.post<EstilosModel,EstilosModel>('EstilosModels',model);
  }
  public delete(IdEstilo:number):Observable<EstilosModel>{
    return this._httpClient.delete<EstilosModel>(`EstilosModels/${IdEstilo}`);
  }
}
