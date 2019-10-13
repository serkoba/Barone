import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/core/core.module.export';
import { Observable, from, of, zip, forkJoin } from 'rxjs';
import { InsumoModel } from '../../shared/models/insumo.model';
import { RecetaModel } from '../../shared/models/receta/receta.model';
import { RecetasService } from '../../recetas/services/recetas.service';
import { concatMap, mergeMap, map, last, switchMap, concat } from 'rxjs/operators';
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
      // const maltaUpdate = from(malta)
      //   .pipe(concatMap((malt) => {
      //     const maltaItem = MaltaModel.fromJSON(malt);
      //     return of({ Insumo: this.getById(maltaItem.Insumo.id), Cantidad: maltaItem.Cantidad });
      //   }), concatMap((insumo) => {
      //     return insumo.Insumo.pipe(map(ins => {
      //       ins.Stock = ins.Stock - (insumo.Cantidad * coccionModel.Multiplicador);
      //       return ins;
      //     }))

      //   }), concatMap(insumo => {
      //     return this.update(insumo);
      //   }), map(() => { }));


        let maltaUpdate = [];
        malta.forEach(malt => {
          const maltaItem = MaltaModel.fromJSON(malt);
const amountToSub = maltaItem.Cantidad * coccionModel.Multiplicador;
         const request=
         this.updateInsumoStock(new InsumoModel({id:maltaItem.Insumo.id,Stock:amountToSub}));
        
         maltaUpdate.push(request);
      
    });
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
let updateLupulos = [];
      coccionModel._lupulos.forEach(lupuloMediciones => {
        lupuloMediciones.LupuloMediciones.forEach(medicion => {
         const request=
         this.updateInsumoStock(new InsumoModel({id:medicion.Insumo.id,Stock:medicion.Cantidad}));
        
        updateLupulos.push(request);
      })
    });

//return forkJoin(updateLupulos);
     


//       const lupuloUpdateMediciones = from(coccionModel._lupulos)
//       .pipe(mergeMap((lupuloMedicion)=>{return lupuloMedicion.LupuloMediciones})
//       ,mergeMap((medicionLupulo)=>{
//         return zip( this.getById(medicionLupulo.Insumo.id),of(medicionLupulo.Cantidad),(insumoT:InsumoModel,cantidad:number)=>{
//           insumoT.Stock-=cantidad;
//           return insumoT;
//         })
        
        
//       }),concatMap((insumosUpdated)=>{
// return this.update(insumosUpdated);
//       })
//       ,map(()=>{}));
     


//       const lupuloUpdateMediciones = from(coccionModel._lupulos)
//       .pipe(concatMap((insumo)=>{
//         return from(insumo.LupuloMediciones)
//         .pipe(concatMap(ins =>
//           { 
//             return this.getById(ins.Insumo.id).pipe(map(insumoToUpdate =>{
//                insumoToUpdate.Stock-=ins.Cantidad;
//                return insumoToUpdate;
//               }));

//           }))
//       })
//       ,mergeMap((insumoUpdated =>{
//         return  this.update(insumoUpdated);
// //        return this.update(insumoUpdated)
//       })), map(()=>{}));


      // const lupuloUpdateMediciones = from(coccionModel._lupulos)
      //   .pipe(concatMap((lupulo) => {
      //   //  const adjItem = AdjuntosModel.fromJSON(lupulo);
      //     return of({ Insumo: this.getById(lupulo.Insumo.id), Cantidad: adjItem.Cantidad });
      //   }), concatMap((insumo) => {
      //     return insumo.Insumo.pipe(map(ins => {
      //       ins.Stock = ins.Stock - (insumo.Cantidad * coccionModel.Multiplicador);
      //       return ins;
      //     }))

      //   }), mergeMap(insumo => {
      //     return this.update(insumo);
      //   }), map(() => { }));


///TODO - Pendiente de respuesta, BORRAR Cantidad en HERVOR???
      // const lupuloUpdate = from(lupulo)
      //   .pipe(concatMap((lup) => {
      //     const lupItem = LupuloModel.fromJSON(lup);
      //     return of(this.getById(lupItem.Insumo.id));
      //   }), concatMap((insumo) => {
      //     return insumo.pipe(map(ins => {
      //       ins.Stock = ins.Stock - CantidadTotal;
      //       return ins;
      //     }))

      //   }), mergeMap(insumo => {
      //     return this.update(insumo);
      //   }), map(() => { }));


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

      let adjuntoUpdate = [];
      adjunto.forEach(adj => {
        const adjItem = AdjuntosModel.fromJSON(adj);
const amountToSub = adjItem.Cantidad * coccionModel.Multiplicador;
       const request=
       this.updateInsumoStock(new InsumoModel({id:adjItem.Insumo.id,Stock:amountToSub}));
      
       adjuntoUpdate.push(request);
    
  });

// //TODO - DEscomentar despues 
//       const adjuntoUpdate = from(adjunto)
//         .pipe(concatMap((adj) => {
//           const adjItem = AdjuntosModel.fromJSON(adj);
//           return of({ Insumo: this.getById(adjItem.Insumo.id), Cantidad: adjItem.Cantidad });
//         }), concatMap((insumo) => {
//           return insumo.Insumo.pipe(map(ins => {
//             ins.Stock = ins.Stock - (insumo.Cantidad * coccionModel.Multiplicador);
//             return ins;
//           }))

//         }), mergeMap(insumo => {
//           return this.update(insumo);
//         }), map(() => { }));

      // adjunto.forEach(x => {
      //   x.Insumo.Stock = x.Insumo.Stock - (x.Cantidad * coccionModel.Multiplicador);
      //   allInsumos.push(x.Insumo);
      // });
    
     return zip(forkJoin( updateLupulos), forkJoin(maltaUpdate), forkJoin(adjuntoUpdate)).pipe(map(() => { }));
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
  public updateInsumoStock(model: InsumoModel): Observable<InsumoModel> {
    return this._httpClient.post<InsumoModel, InsumoModel>('UpdateStock', model);
  }
  public delete(idInsumo: number): Observable<InsumoModel> {
    return this._httpClient.delete<InsumoModel>(`InsumoModels/${idInsumo}`);
  }
}
