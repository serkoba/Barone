import { Component, OnInit } from '@angular/core';
import { DBOperation } from 'src/app/core/enum/enum.enum';
import { InsumoModel } from 'src/app/modules/shared/models/insumo.model';
import { SnackManagerService, SelectItem } from 'src/app/core/core.module.export';
import { InsumosService } from '../../services/insumos.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-insumos',
  templateUrl: './edit-insumos.component.html',
  styleUrls: ['./edit-insumos.component.scss']
})
export class EditInsumosComponent implements OnInit {

  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  insumo: InsumoModel;

  TipoInsumos: SelectItem[] = [
    { value: 0, viewValue: 'Seleccione Categoria' },
    { value: 1, viewValue: 'Malta' },
    { value: 2, viewValue: 'Lupulos' },
    { value: 3, viewValue: 'Agua' },
    { value: 4, viewValue: 'Otros' }
  ];

  TipoUnidadMedidas: SelectItem[] = [
    { value: 0, viewValue: 'Seleccione Categoria' },
    { value: 1, viewValue: 'Kg' },
    { value: 2, viewValue: 'gr' }
  ];

  constructor(private _snack: SnackManagerService,
    private insumosServices: InsumosService,
    public dialogRef: MatDialogRef<EditInsumosComponent>) {
  }

  ngOnInit() {
    if (typeof (this.insumo) == "undefined")
      this.insumo = new InsumoModel();

  }

  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:
        this.insumo.Stock = 0;
        this.insumosServices.insert(this.insumo).subscribe((result) => {
          this.insumo.id = result.id;
          this.dialogRef.close("success");
          this._snack.openSnackBar("Insumo Creado Exitosamente", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.update:

        this.insumosServices.update(this.insumo).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Insumo Actualizado", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.delete:

        this.insumosServices.delete(this.insumo.id).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Insumo Eliminado", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;

    }
  }


}