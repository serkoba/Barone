import { Component, OnInit } from '@angular/core';
import { DBOperation } from 'src/app/core/enum/enum.enum';
import { HervorModel } from 'src/app/modules/shared/models/coccion/hervor.model';
import { MashModel } from 'src/app/modules/shared/models/coccion/mash.model';
import { LupuloMediciones } from 'src/app/modules/shared/models/receta/lupulo.model';
import { CarbonatacionModel } from 'src/app/modules/shared/models/coccion/carbonatacion.model';
import { MedicionesFermentacionModel } from 'src/app/modules/shared/models/coccion/mediciones-fermentacion.model';
import { CoccionModel } from 'src/app/modules/shared/models/coccion/coccion.model';
import { SelectItem } from 'src/app/core/models/select-item';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { SnackManagerService } from 'src/app/core/core.module.export';
import { MatDialogRef } from '@angular/material';
import { FermentacionModel, AdjuntoFermentacionModel } from 'src/app/modules/shared/models/coccion/fermentacion.model';
import { InsumosService } from 'src/app/modules/insumos/services/insumos.service';
import { CoccionesService } from '../../services/cocciones.service';
import { VolumenModel } from 'src/app/modules/shared/models/coccion/volumen-medicion.model';

@Component({
  selector: 'app-stepper-cocciones2',
  templateUrl: './stepper-cocciones2.component.html',
  styleUrls: ['./stepper-cocciones2.component.scss']
})
export class StepperCocciones2Component implements OnInit {
  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  public coccion: CoccionModel;
  public isLinear = true;
  public VolumenTotal=0;
  public EstiloOrigenes: SelectItem[];
  time2: NgbTimeStruct;
  columnsVolumen: any[] = [
    {
      display: 'Fecha',
      variable: 'Fecha',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Volumen',
      variable: 'Volumen',
      filter: 'text',
      template: 'text'
    }
  ];
  columnsMash: any[] = [
    {
      display: 'Periodo',
      variable: 'Periodo',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Densidad',
      variable: 'Densidad',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'PH',
      variable: 'PH',
      filter: 'text',
      template: 'text'
    }]

    columnLupulos: any[] =
    [{
      display: 'Insumo',
      variable: 'Insumo',
      filter: 'text',
      template: 'dropdown'
    },
    {
      display: 'Cantidad',
      variable: 'Cantidad',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Porcentaje AA',
      variable: 'PorcentajeAA',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Tiempo',
      variable: 'Tiempo',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'IBUS',
      variable: 'IBUS',
      filter: 'text',
      template: 'text'
    }];

  columnsHervor: any[] = [
    {
      display: 'Litros en Olla',
      variable: 'LitrosEnOlla',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'DDe Entrada',
      variable: 'DDeEntrada',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Densidad Inicial',
      variable: 'DensidadInicial',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'PH Inicial',
      variable: 'PHInicial',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Gramos',
      variable: 'Cantidad',
      filter: 'text',
      template: 'text'
    }]
    columnsAdjuntoFermentacion: any[] = [
      {
        display: 'Adjunto',
        variable: 'AdjuntoDetalle',
        filter: 'text',
        template: 'text'
      },
      {
        display: 'Gramos',
        variable: 'AdjuntoGramos',
        filter: 'text',
        template: 'text'
      },
      {
        display: 'Dia',
        variable: 'AdjuntoDia',
        filter: 'text',
        template: 'text'
      }];
  columnsFermentacion: any[] = [
    {
      display: 'Dia',
      variable: 'Dia',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Temperatura',
      variable: 'Temperatura',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'PH',
      variable: 'PH',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Densidad',
      variable: 'Densidad',
      filter: 'text',
      template: 'text'
    }]

  constructor(private insumosServices: InsumosService, private coccionServices: CoccionesService, private _snack: SnackManagerService,
    public dialogRef: MatDialogRef<StepperCocciones2Component>) { }

  ngOnInit() {
    this.time2 = { hour: 16, minute: 15, second: 0 };
    if (this.coccion.MedicionesMash == null) {
      this.coccion._medicionesMash = [];
      this.fillMash();
    }
    if (this.coccion.VolumenMediciones == null) {
      this.coccion._VolumenMediciones = [];
      this.fillVolumen();
    }
    if (this.coccion.Hervor == null) {
      this.coccion._hervor = [];
      this.fillHervor();
    }
    if (this.coccion.Lupulos==null){
      this.coccion._lupulos=[];
      this.fillLupulos();
    }
    if (this.coccion.Fermentacion == null) {
      this.coccion._fermentacion = new FermentacionModel();
      this.coccion._fermentacion.Mediciones = [MedicionesFermentacionModel.empty()];
      this.coccion._fermentacion.Adjunto = [AdjuntoFermentacionModel.empty()];
    }
    else
    {
     if (this.coccion._fermentacion.Mediciones==null) this.coccion._fermentacion.Mediciones = [MedicionesFermentacionModel.empty()];
     if (this.coccion._fermentacion.Adjunto==null)  this.coccion._fermentacion.Adjunto = [AdjuntoFermentacionModel.empty()];
    }
    if (this.coccion.Carbonatacion == null) {
      this.coccion._carbonatacion = new CarbonatacionModel();
    }

    this.loadEstilos();
  }
  public getVolumenes(){
    let totalSuma=0;
    this.coccion._VolumenMediciones.map(x=>x.VolumenMediciones.map(y=> totalSuma+=+y.Volumen));
    return this.VolumenTotal=totalSuma;
  }
 
  public fillLupulos() {

    for (let index = 1; index <= this.coccion.Multiplicador; index++) {
      this.coccion._lupulos.push(LupuloMediciones.empty());

    }

  }
  public fillVolumen() {

    for (let index = 1; index <= this.coccion.Multiplicador; index++) {
      this.coccion._VolumenMediciones.push(VolumenModel.empty());

    }

  }
  public fillMash() {

    for (let index = 1; index <= this.coccion.Multiplicador; index++) {
      this.coccion._medicionesMash.push(MashModel.empty());

    }

  }
  public fillHervor() {
    for (let index = 1; index <= this.coccion.Multiplicador; index++) {
      this.coccion._hervor.push(HervorModel.empty());

    }
  }
  public loadEstilos() {
    this.coccionServices.getNroLoteAllCocciones().subscribe(lotes => {
      this.EstiloOrigenes = lotes;
    })
  }
  onSubmit(estado: number) {
    if (estado == 3) {
    
      this.insumosServices.updateStock(this.coccion).subscribe();
    }
    this.coccion.MedicionesMash = JSON.stringify(this.coccion._medicionesMash);
    this.coccion.Hervor = JSON.stringify(this.coccion._hervor);
    this.coccion.Fermentacion = JSON.stringify(this.coccion._fermentacion);
    this.coccion.Carbonatacion = JSON.stringify(this.coccion._carbonatacion);
    this.coccion.Lupulos=JSON.stringify(this.coccion._lupulos);
    switch (this.dbops) {
      // case DBOperation.create:

      //   this.coccionServices.insert(this.coccion).subscribe((result) => {
      //     this.coccion.id = result.id;
      //     this.dialogRef.close("success");
      //     this._snack.openSnackBar("Coccion Creada Exitosamente", 'Success');

      //   }, error => {
      //     this._snack.openSnackBar(error, 'Error');
      //     this.dialogRef.close("error");

      //   });

      //   break;
      case DBOperation.IniciarCoccion:
        this.coccion.Estado = estado;
        this.coccionServices.update(this.coccion).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Coccion Actualizada", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      // case DBOperation.delete:

      //   this.coccionServices.delete(this.coccion.id).subscribe(() => {
      //     this.dialogRef.close("success");
      //     this._snack.openSnackBar("Coccion Eliminada", 'Success');

      //   }, error => {
      //     this._snack.openSnackBar(error, 'Error');
      //     this.dialogRef.close("error");

      //   });

      //   break;

    }
  }

}
