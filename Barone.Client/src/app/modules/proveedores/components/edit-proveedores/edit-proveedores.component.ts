import { Component, OnInit } from '@angular/core';
import { DBOperation } from 'src/app/core/enum/enum.enum';
import { ProveedoresModel } from 'src/app/modules/shared/models/proveedor.model';
import { SnackManagerService } from 'src/app/core/core.module.export';
import { ProveedoresService } from '../../services/proveedores.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-proveedores',
  templateUrl: './edit-proveedores.component.html',
  styleUrls: ['./edit-proveedores.component.scss']
})
export class EditProveedoresComponent implements OnInit {



  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  proveedor: ProveedoresModel;


  constructor(private _snack: SnackManagerService,
    private proveedoresServices: ProveedoresService,
    public dialogRef: MatDialogRef<EditProveedoresComponent>) {
  }

  ngOnInit() {
    if (typeof (this.proveedor) == "undefined")
      this.proveedor = new ProveedoresModel();

  }

  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:

        this.proveedoresServices.insert(this.proveedor).subscribe((result) => {
          this.proveedor.id = result.id;
          this.dialogRef.close("success");
          this._snack.openSnackBar("Proveedor Creado Exitosamente", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.update:

        this.proveedoresServices.update(this.proveedor).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Proveedor Actualizado", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.delete:

        this.proveedoresServices.delete(this.proveedor.id).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Proveedor Eliminado", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;

    }
  }


}