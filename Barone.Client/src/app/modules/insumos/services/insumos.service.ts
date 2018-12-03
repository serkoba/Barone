import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/core.module.export';
import { Observable, from, of, zip } from 'rxjs';
import { InsumoModel } from '../../shared/models/insumo.model';
import { RecetaModel } from '../../shared/models/receta/receta.model';
import { RecetasService } from '../../recetas/services/recetas.service';
import { concatMap, mergeMap, map, last, switchMap } from 'rxjs/operators';
import { CoccionModel } from '../../shared/models/coccion/coccion.model';
import { MaltaModel } from '../../shared/models/receta/malta.model';
import { AdjuntosModel } from '../../shared/models/receta/adjuntos.model';
import { LupuloModel } from '../../shared/models/receta/lupulo.model';

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
  public getById(idInsumo: number): Observable<InsumoModel> {
    return this._httpClient.get<InsumoModel>(`InsumoModels/${idInsumo}`);
  }

  public updateStock(coccionModel: CoccionModel): Observable<void> {

    Object.create(CoccionModel.prototype)
    let allInsumos: InsumoModel[] = [];
    if (coccionModel != null) {
      const malta = JSON.parse(coccionModel.Receta.Malta);
      const lupulo = JSON.parse(coccionModel.Receta.Lupulo);
      const adjunto = JSON.parse(coccionModel.Receta.Adjunto);
      const maltaUpdate = from(malta)
        .pipe(concatMap((malt) => {
          const maltaItem = MaltaModel.fromJSON(malt);
          return of({ Insumo: this.getById(maltaItem.Insumo.id), Cantidad: maltaItem.Cantidad });
        }), concatMap((insumo) => {
          return insumo.Insumo.pipe(map(ins => {
            ins.Stock = ins.Stock - (insumo.Cantidad * coccionModel.Multiplicador);
            return ins;
          }))

        }), mergeMap(insumo => {
          return this.update(insumo);
        }), map(() => { }));
      // malta.forEach(x => {

      //     x.Insumo.Stock = x.Insumo.Stock - (x.Cantidad * coccionModel.Multiplicador);
      //   allInsumos.push(x.Insumo)
      // });
      let CantidadTotal = 0;
      coccionModel._hervor.forEach(hervor => {
        hervor.Mediciones.forEach(medicciones => {
          CantidadTotal += medicciones.Cantidad;
        })
      });

      const lupuloUpdate = from(lupulo)
        .pipe(concatMap((lup) => {
          const lupItem = LupuloModel.fromJSON(lup);
          return of(this.getById(lupItem.Insumo.id));
        }), concatMap((insumo) => {
          return insumo.pipe(map(ins => {
            ins.Stock = ins.Stock - CantidadTotal;
            return ins;
          }))

        }), mergeMap(insumo => {
          return this.update(insumo);
        }), map(() => { }));


      // const lupuloUpdate = from(lupulo).pipe(concatMap(lup => {
      //   let lupItem = LupuloModel.fromJSON(lup);

      //   return this.getById(lupItem.Insumo.id)
      //     .pipe(map((insumo) => {
      //       coccionModel._hervor.forEach(hervor => {
      //         hervor.Mediciones.forEach(medicciones => {
      //           insumo.Stock = insumo.Stock - medicciones.Cantidad;
      //         })
      //       });
      //       return this.update(insumo);
      //     }))
      // }), map(() => { }));



      // const lupuloUpdate = from(coccionModel._hervor)
      //   .pipe(concatMap((her) => {
      //     return of(her.Mediciones);
      //   }), concatMap((mediciones) => {

      //     return mediciones.map(med => med);
      //     // mediciones.forEach(med => {
      //     //   lupulo.forEach(lup => {
      //     //     lup.Insumo.Stock = lup.Insumo.Stock - med.Cantidad;
      //     //     allInsumos.push(lup.Insumo)
      //     //   });
      //     // })
      //   }), concatMap((med => {
      //     lupulo.forEach(lup => {
      //       const index = allInsumos.findIndex(x => x.Nombre === lup.Insumo.Nombre);
      //       lup.Insumo.Stock = lup.Insumo.Stock - med.Cantidad;
      //       if (index != -1) {
      //         allInsumos.splice(index, 1);
      //       }
      //       allInsumos.push(lup.Insumo);
      //       //  allInsumos.push(lup.Insumo)
      //     });
      //     return from(allInsumos);
      //   })), mergeMap((insumo) => {
      //     return this.update(insumo);
      //   }), map(() => { }));

      // coccionModel._hervor.forEach(x => {

      //   lupulo.forEach(lup => {
      //     lup.Insumo.Stock = lup.Insumo.Stock - x.;
      //     allInsumos.push(lup.Insumo)
      //   });
      //   x.Insumo.Stock = x.Insumo.Stock - x.Cantidad;
      //   allInsumos.push(x.Insumo);
      // });


      const adjuntoUpdate = from(adjunto)
        .pipe(concatMap((adj) => {
          const adjItem = AdjuntosModel.fromJSON(adj);
          return of({ Insumo: this.getById(adjItem.Insumo.id), Cantidad: adjItem.Cantidad });
        }), concatMap((insumo) => {
          return insumo.Insumo.pipe(map(ins => {
            ins.Stock = ins.Stock - (insumo.Cantidad * coccionModel.Multiplicador);
            return ins;
          }))

        }), mergeMap(insumo => {
          return this.update(insumo);
        }), map(() => { }));

      // adjunto.forEach(x => {
      //   x.Insumo.Stock = x.Insumo.Stock - (x.Cantidad * coccionModel.Multiplicador);
      //   allInsumos.push(x.Insumo);
      // });
      return zip(lupuloUpdate, maltaUpdate, adjuntoUpdate).pipe(map(() => { }));
      // return lupuloUpdate.pipe(concatMap(() => maltaUpdate), concatMap(() => adjuntoUpdate),
      //   (map(() => { })));

    }

    // return from(allInsumos)
    //   .pipe(mergeMap(insumo => {
    //     return this.update(insumo);
    //   }));





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
