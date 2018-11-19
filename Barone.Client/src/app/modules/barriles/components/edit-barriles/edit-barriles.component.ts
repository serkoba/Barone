import { Component, OnInit } from '@angular/core';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { MatDialogRef } from '@angular/material';
import { BarrilModel } from '../../../shared/models/barril.model';
import { EstilosService } from '../../../estilos/services/estilos.service';
import { EstilosModel } from '../../../shared/models/estilos.model';
import { SnackManagerService, SelectItem } from '../../../../core/core.module.export';
import { BarrilesService } from '../../services/barriles.service';



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

  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  barril: BarrilModel;

  filteredStates: any;
  constructor(public barrilServices: BarrilesService, public _snack: SnackManagerService, public estilosServices: EstilosService, public dialogRef: MatDialogRef<EditBarrilesComponent>) { }

  ngOnInit() {
    if (typeof (this.barril) == "undefined")
      this.barril = new BarrilModel();
    this.loadEstilos();
  }
  public loadEstilos() {
    this.estilosServices.getAll().subscribe(estilos => {
      this.estilos = estilos;
      this.estilosSelect = estilos.map(estilo => { return new SelectItem({ value: estilo.IdEstilo, viewValue: estilo.Nombre }) });
    })
  }
  public changeSelect(idEstilo: Number) {
    this.barril.Estilo = this.estilos.find(x => x.IdEstilo === idEstilo);
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
