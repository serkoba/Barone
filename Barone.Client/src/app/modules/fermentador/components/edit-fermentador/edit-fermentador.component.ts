import { Component, OnInit } from '@angular/core';
import { DBOperation } from 'src/app/core/enum/enum.enum';
import { FermentadorModel } from 'src/app/modules/shared/models/fermentador.model';
import { SnackManagerService } from 'src/app/core/core.module.export';
import { FermentadorService } from '../../services/fermentador.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-fermentador',
  templateUrl: './edit-fermentador.component.html',
  styleUrls: ['./edit-fermentador.component.scss']
})
export class EditFermentadorComponent implements OnInit {



  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  fermentador: FermentadorModel;


  constructor(private _snack: SnackManagerService,
    private fermentadorServices: FermentadorService,
    public dialogRef: MatDialogRef<EditFermentadorComponent>) {
  }

  ngOnInit() {
    if (typeof (this.fermentador) == "undefined")
      this.fermentador = new FermentadorModel();

  }

  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:

        this.fermentadorServices.insert(this.fermentador).subscribe((result) => {
          this.fermentador.id = result.id;
          this.dialogRef.close("success");
          this._snack.openSnackBar("Fermentador Creado Exitosamente", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.update:

        this.fermentadorServices.update(this.fermentador).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Fermentador Actualizado", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.delete:

        this.fermentadorServices.delete(this.fermentador.id).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Fermentador Eliminado", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;

    }
  }


}