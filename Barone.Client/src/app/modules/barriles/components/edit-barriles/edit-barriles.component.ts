import { Component, OnInit } from '@angular/core';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { MatDialogRef } from '@angular/material';
import { BarrilModel } from '../../../shared/models/barril.model';
import { EstilosService } from '../../../estilos/services/estilos.service';
import { EstilosModel } from '../../../shared/models/estilos.model';
import { SnackManagerService, SelectItem } from '../../../../core/core.module.export';
import { BarrilesService } from '../../services/barriles.service';
import { CoccionModel } from 'src/app/modules/shared/models/coccion/coccion.model';
import { CoccionesService } from 'src/app/modules/coccion/services/cocciones.service';



@Component({
  selector: 'edit-barriles',
  templateUrl: './edit-barriles.component.html',
  styleUrls: ['./edit-barriles.component.scss']
})
export class EditBarrilesComponent implements OnInit {

  Estados: SelectItem[] = [
    { value: 0, viewValue: 'Seleccione Categoria' },
    { value: 1, viewValue: 'Para Despacho' },
    { value: 2, viewValue: 'Entregadas' },
    { value: 3, viewValue: 'En Progreso' },
    { value: 4, viewValue: 'Reservado' }
  ];
  estilos: EstilosModel[] = [];
  estilosSelect: SelectItem[] = [];
  cocciones: CoccionModel[];
  coccionesSelect: SelectItem[] = [];
  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  barril: BarrilModel;

  filteredStates: any;
  constructor(public coccionServices: CoccionesService, public barrilServices: BarrilesService, public _snack: SnackManagerService, public estilosServices: EstilosService, public dialogRef: MatDialogRef<EditBarrilesComponent>) { }

  ngOnInit() {
    if (typeof (this.barril) == "undefined")
      this.barril = new BarrilModel();
    //  this.loadEstilos();
    this.loadCocciones();
  }
  public loadCocciones() {
    this.coccionServices.getAll().subscribe(cocciones => {
      this.cocciones = cocciones;
      this.coccionesSelect = cocciones.map(coccion => { return new SelectItem({ value: coccion.id, viewValue: coccion.NroLote }) });
    })
  }
  // public loadEstilos() {
  //   this.estilosServices.getAll().subscribe(estilos => {
  //     this.estilos = estilos;
  //     this.estilosSelect = estilos.map(estilo => { return new SelectItem({ value: estilo.IdEstilo, viewValue: estilo.Nombre }) });
  //   })
  // }
  public changeNroLote(idCoccion: number) {
    this.barril.Coccion = this.cocciones.find(x => x.id === idCoccion);
    this.barril.Coccion_id=this.barril.Coccion.id;
    this.barril.Estilo = this.barril.Coccion.Receta.Estilo;// this.estilos.find(x => x.IdEstilo === this.barril.Coccion.Receta.Estilo.IdEstilo);
    this.barril.IdEstilo = this.barril.Coccion.Receta.Estilo.IdEstilo;// this.estilos.find(x => x.IdEstilo === this.barril.Coccion.Receta.Estilo.IdEstilo).IdEstilo;
  }
  public changeSelect(idEstilo: Number) {
    this.barril.Estilo = this.estilos.find(x => x.IdEstilo === idEstilo);
  }
  public HayEstilo() {
    return this.barril.Estilo != undefined;
  }
  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:

        this.barrilServices.insert(this.barril).subscribe((result) => {
          this.barril.id = result.id;
          this.dialogRef.close("success");
          this._snack.openSnackBar("Barril Creado Exitosamente", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.update:

        this.barrilServices.update(this.barril).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Estilo Actualizado", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.delete:

        this.barrilServices.delete(this.barril.id).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Barril Eliminado", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;

    }
  }

}
