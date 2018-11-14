import { Component, OnInit } from '@angular/core';
import { ComprasModel } from 'src/app/modules/shared/models/compras.model';
import { DBOperation, OperationsStock } from 'src/app/core/enum/enum.enum';
import { SnackManagerService } from 'src/app/core/core.module.export';
import { MatDialog } from '@angular/material';
import { EditComprasComponent } from '../edit-compras/edit-compras.component';
import { ComprasService } from '../../services/compras.service';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-admincompras',
  templateUrl: './admincompras.component.html',
  styleUrls: ['./admincompras.component.scss']
})
export class AdmincomprasComponent implements OnInit {
  compras: ComprasModel[];
  isREADONLY: boolean = false;
  exportFileName: string = "compra_";
  dbops: DBOperation;
  msg: string;
  modalTitle: string;
  modalBtnTitle: string;
  compra: ComprasModel;
  //Grid Vars start
  columns: any[] = [
    {
      display: 'Fecha Compra',
      variable: 'FechaCompra',
      filter: 'date',
      template: 'text'
    },
    {
      display: 'Cantidad',
      variable: 'Cantidad',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Insumo',
      variable: 'Insumo',
      filter: 'insumo',
      template: 'text'
    },
    {
      display: 'Proveedor',
      variable: 'Proveedor',
      filter: 'cliente',
      template: 'text'
    },
    {
      display: 'Precio',
      variable: 'Precio',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Acciones',
      variable: 'acciones',
      filter: 'text',
      template: 'acciones'
    }
  ];
  sorting: any = {
    column: 'FechaCompra',
    descending: false
  };
  hdrbtns: any[] = [];
  gridbtns: any[] = [];
  initGridButton() {

    this.hdrbtns = [
      {
        title: 'Nueva Compra',
        keys: [''],
        action: DBOperation.create,
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

  constructor(private _snack: SnackManagerService,
    private comprasServices: ComprasService, private dialog: MatDialog) { }
  openDialog() {
    let dialogRef = this.dialog.open(EditComprasComponent);
    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.compra = this.compra;

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.loadCompras();
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
    this.loadCompras();

  }
  loadCompras(): void {
    this.compras = [];
    this.comprasServices.getAll()
      .subscribe(compras => { this.compras = compras; this.initGridButton(); });
  }

  AddCompra() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Agrega Nueva Compra";
    this.modalBtnTitle = "Guardar";
    this.openDialog();
  }
  EditCompra(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Edit Compra";
    this.modalBtnTitle = "Update";
    this.compra = this.compras.find(x => x.id === id);

    this.openDialog();
  }
  DeleteCompra(id: number) {
    this.dbops = DBOperation.delete;
    this.comprasServices.delete(id)
      .pipe(concatMap(result => {
        this.compra = this.compras.find(x => x.id === id);
        return this.comprasServices.UpdateStock(OperationsStock.Substract, this.compra);
      })).subscribe(() => {
        this._snack.openSnackBar("Compra Eliminada", 'Success');
        this.loadCompras();
      }, error => {
        this._snack.openSnackBar(error, 'Error');


      });
  }

  gridaction(gridaction: any): void {

    switch (gridaction.action) {
      case DBOperation.create:
        this.AddCompra();
        break;
      case DBOperation.update:
        this.EditCompra(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.DeleteCompra(gridaction.values[0].value);
        break;
    }

  }
}

