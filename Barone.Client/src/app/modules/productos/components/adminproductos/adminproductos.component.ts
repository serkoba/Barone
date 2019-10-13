import { Component, OnInit, ViewChild } from '@angular/core';
import { DBOperation } from 'src/app/core/enum/enum.enum';
import { ProductosService } from '../../services/productos.service';
import { SnackManagerService } from 'src/app/core/services/snack-manager.service';
import { MatDialog } from '@angular/material';
import { GridComponent } from 'src/app/core/core.module.export';
import { ProductosModel } from 'src/app/modules/shared/models/productos.model';
import { EditProductosComponent } from '../edit-productos/edit-productos.component';
import { ButtonType } from 'src/app/modules/shared/enum/enums';
import { ProductoEstiloComponent } from '../producto-estilo/producto-estilo.component';

@Component({
  selector: 'app-adminproductos',
  templateUrl: './adminproductos.component.html',
  styleUrls: ['./adminproductos.component.scss']
})
export class AdminproductosComponent implements OnInit {
  productos: ProductosModel[];
  isREADONLY: boolean = false;
  exportFileName: string = "clients_";
  dbops: DBOperation;
  msg: string;
  modalTitle: string;
  modalBtnTitle: string;
  producto: ProductosModel;
  hdrbtns: any[] = [];
  gridbtns: any[] = [];
  @ViewChild('grid') public grid: GridComponent;
  columns: any[] = [
    {
      display: 'Nombre',
      variable: 'Nombre',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'stock',
      variable: 'Stock',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Litros',
      variable: 'Litros',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Acciones',
      variable: 'acciones',
      filter: 'text',
      template: 'acciones',
      Sumarizable:false
    }

  ];
  sorting: any = {
    column: 'Nombre',
    descending: false
  };

  public initGridButton() {

    this.hdrbtns = [
      {
        title: 'Nueva Producto',
        keys: [''],
        action: DBOperation.create,
        ishide: this.isREADONLY

      },
      {
        title: 'Cambiar Estados/Estilo a  Productos',
        keys: [''],
        action: DBOperation.CambiarEstadoBarriles,
        ishide: this.isREADONLY

      }];
    this.gridbtns = [
      {
        title: 'Editar',
        icon: 'create',
        keys: ['id'],
        action: DBOperation.update,
        ishide: this.isREADONLY
      },
      {
        title: 'Borrar',
        icon: 'clear',
        keys: ["id"],
        action: DBOperation.delete,
        ishide: this.isREADONLY
      }

    ];
  }

  constructor(private _snack: SnackManagerService, private productosServices: ProductosService, private dialog: MatDialog) { }
  openDialog(type: string) {
    let dialogRef = null;
    switch (type) {
      case ButtonType.Producto:
        dialogRef = this.dialog.open(EditProductosComponent);
        break;
      case ButtonType.BarrilEstado:
        dialogRef = this.dialog.open(ProductoEstiloComponent);
        break;
     
      default:
        break;
    }
  //  let dialogRef = this.dialog.open(EditProductosComponent);
    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.producto = this.producto;

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.LoadProductos();
        switch (this.dbops) {
          case DBOperation.create:
            this.msg = "Data successfully added.";
            break;
          case DBOperation.update:
            this.msg = "Data successfully updated.";
            break;
          case DBOperation.delete:
            this.msg = "Data successfully deleted.";
            break;
        }
      }
      else if (result == "error")
        this.msg = "There is some issue in saving records, please contact to system administrator!"
      else
        this.msg = result;
    });
  }

  ngOnInit() {
    this.LoadProductos();

  }
  LoadProductos(): void {
    this.productos = [];

    this.productosServices.getAll()
      .subscribe(productos => { this.productos = productos; this.initGridButton(); });

  }

  addProducto() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Agrega Nuevo Producto";
    this.modalBtnTitle = "Guardar";
    this.openDialog(ButtonType.Producto);
  }
  EditProducto(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Edit Producto";
    this.modalBtnTitle = "Update";
    this.producto = this.productos.find(x => x.id === id);
    
    this.openDialog(ButtonType.Producto);
  }
  DeleteProducto(id: number) {
    this.dbops = DBOperation.delete;
    this.productosServices.delete(id).subscribe(() => {
      // this.dialogRef.close("success");
      this._snack.openSnackBar("Producto Eliminado", 'Success');
      this.LoadProductos();
    }, error => {
      this._snack.openSnackBar(error, 'Error');
      //  this.dialogRef.close("error");

    });
  }
  public CambiarEstadoBarriles() {
    this.modalTitle = "Cambiar Estado a un Producto";
    this.modalBtnTitle = "Guardar";
    this.openDialog(ButtonType.BarrilEstado);
  }

  gridaction(gridaction: any): void {

    switch (gridaction.action) {
      case DBOperation.create:
        this.addProducto();
        break;
      case DBOperation.update:
        this.EditProducto(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.DeleteProducto(gridaction.values[0].value);
        break;
        case DBOperation.CambiarEstadoBarriles:
          this.CambiarEstadoBarriles();
          break;
    }

  }
}
