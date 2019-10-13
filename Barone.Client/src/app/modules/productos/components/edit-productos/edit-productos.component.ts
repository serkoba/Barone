import { Component, OnInit } from '@angular/core';
import { DBOperation } from 'src/app/core/enum/enum.enum';
import { ProductosModel } from 'src/app/modules/shared/models/productos.model';
import { SnackManagerService } from 'src/app/core/services/snack-manager.service';
import { CoccionesService } from 'src/app/modules/coccion/services/cocciones.service';
import { SelectItem } from 'src/app/core/models/select-item';
import { CoccionModel } from 'src/app/modules/shared/models/coccion/coccion.model';
import { MatDialogRef } from '@angular/material';
import { ProductosService } from '../../services/productos.service';
import { EstilosModel } from 'src/app/modules/shared/models/estilos.model';
import { EstilosService } from 'src/app/modules/estilos/services/estilos.service';

@Component({
  selector: 'app-edit-productos',
  templateUrl: './edit-productos.component.html',
  styleUrls: ['./edit-productos.component.scss']
})
export class EditProductosComponent implements OnInit {
  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  producto: ProductosModel;
  constructor(public coccionServices: CoccionesService, public productosServices: ProductosService, public _snack: SnackManagerService, public estilosServices: EstilosService, public dialogRef: MatDialogRef<EditProductosComponent>) { }

  ngOnInit() {
    if (typeof (this.producto) == "undefined")
      this.producto = new ProductosModel();
  }

 

  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:

        this.productosServices.insert(this.producto).subscribe((result) => {
          this.producto.id = result.id;
          this.dialogRef.close("success");
          this._snack.openSnackBar("Producto Creado Exitosamente", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.update:

        this.productosServices.update(this.producto).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Estilo Actualizado", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.delete:

        this.productosServices.delete(this.producto.id).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Producto Eliminado", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;

    }
  }

}
