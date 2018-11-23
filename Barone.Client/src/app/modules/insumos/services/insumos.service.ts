import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/core.module.export';
import { Observable, from } from 'rxjs';
import { InsumoModel } from '../../shared/models/insumo.model';
import { RecetaModel } from '../../shared/models/receta/receta.model';
import { RecetasService } from '../../recetas/services/recetas.service';
import { concatMap, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {
  constructor(
    private recetaServices: RecetasService,
    private _httpClient: HttpClientService) { }

  public getAll(): Observable<InsumoModel[]> {
    return this._httpClient.get<InsumoModel[]>('InsumoModels');
  }

  public updateStock(recetaModel: RecetaModel): Observable<void> {

    Object.create(RecetaModel.prototype)
    let allInsumos: InsumoModel[] = [];
    if (recetaModel != null) {
      const malta = JSON.parse(recetaModel.Malta);
      const lupulo = JSON.parse(recetaModel.Lupulo);
      const adjunto = JSON.parse(recetaModel.Adjunto);
      malta.forEach(x => {
        x.Insumo.Stock = x.Insumo.Stock - x.Cantidad;
        allInsumos.push(x.Insumo)
      });
      lupulo.forEach(x => {
        x.Insumo.Stock = x.Insumo.Stock - x.Cantidad;
        allInsumos.push(x.Insumo);
      });
      adjunto.forEach(x => {
        x.Insumo.Stock = x.Insumo.Stock - x.Cantidad;
        allInsumos.push(x.Insumo);
      });


    }
    return from(allInsumos)
      .pipe(mergeMap(insumo => {
        return this.update(insumo);
      }));





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
