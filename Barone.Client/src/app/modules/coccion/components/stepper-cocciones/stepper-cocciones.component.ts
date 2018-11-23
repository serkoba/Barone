import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatDialogRef } from '@angular/material';
import { MashModel } from 'src/app/modules/shared/models/coccion/mash.model';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { CoccionModel } from 'src/app/modules/shared/models/coccion/coccion.model';
import { DBOperation } from 'src/app/core/enum/enum.enum';
import { HervorModel } from 'src/app/modules/shared/models/coccion/hervor.model';
import { FermentacionModel } from 'src/app/modules/shared/models/coccion/fermentacion.model';
import { MedicionesFermentacionModel } from 'src/app/modules/shared/models/coccion/mediciones-fermentacion.model';
import { CarbonatacionModel } from 'src/app/modules/shared/models/coccion/carbonatacion.model';
import { CoccionesService } from '../../services/cocciones.service';
import { SnackManagerService, SelectItem } from 'src/app/core/core.module.export';

@Component({
  selector: 'stepper-cocciones',
  templateUrl: './stepper-cocciones.component.html',
  styleUrls: ['./stepper-cocciones.component.scss']
})
export class StepperCoccionesComponent implements OnInit {
  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  public coccion: CoccionModel;
  public isLinear = true;
  public EstiloOrigenes: SelectItem[];
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
  columnsHervor: any[] = [
    {
      display: 'LitrosEnOlla',
      variable: 'LitrosEnOlla',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'DDeEntrada',
      variable: 'DDeEntrada',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'DensidadInicial',
      variable: 'DensidadInicial',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'PHInicial',
      variable: 'PHInicial',
      filter: 'text',
      template: 'text'
    }]
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

  constructor(private coccionServices: CoccionesService, private _snack: SnackManagerService,
    public dialogRef: MatDialogRef<StepperCoccionesComponent>) { }

  ngOnInit() {

    if (this.coccion.MedicionesMash == null) {
      this.coccion._medicionesMash = [];
      this.fillMash();
    }
    if (this.coccion.Hervor == null) {
      this.coccion._hervor = [];
      this.fillHervor();
    }
    if (this.coccion.Fermentacion == null) {
      this.coccion._fermentacion = new FermentacionModel();
      this.coccion._fermentacion.Mediciones = [MedicionesFermentacionModel.empty()];
    }
    if (this.coccion.Carbonatacion == null) {
      this.coccion._carbonatacion = new CarbonatacionModel();
    }

    this.loadEstilos();
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
    this.coccion.MedicionesMash = JSON.stringify(this.coccion._medicionesMash);
    this.coccion.Hervor = JSON.stringify(this.coccion._hervor);
    this.coccion.Fermentacion = JSON.stringify(this.coccion._fermentacion);
    this.coccion.Carbonatacion = JSON.stringify(this.coccion._carbonatacion);
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
