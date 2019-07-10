import { Component, OnInit } from '@angular/core';
import { ProveedoresModel } from 'src/app/modules/shared/models/proveedor.model';
import { DBOperation } from 'src/app/core/enum/enum.enum';
import { SnackManagerService } from 'src/app/core/services/snack-manager.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { MatDialog } from '@angular/material';
import { EditProveedoresComponent } from '../edit-proveedores/edit-proveedores.component';

@Component({
  selector: 'adminproveedores',
  templateUrl: './adminproveedores.component.html',
  styleUrls: ['./adminproveedores.component.scss']
})
export class AdminproveedoresComponent implements OnInit {
  proveedores: ProveedoresModel[];
  isREADONLY: boolean = false;
  exportFileName: string = "proveedor_";
  dbops: DBOperation;
  msg: string;
  modalTitle: string;
  modalBtnTitle: string;
  proveedor: ProveedoresModel;
  //Grid Vars start
  columns: any[] = [
    {
      display: 'Razon Social',
      variable: 'RazonSocial',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Direccion',
      variable: 'Direccion',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Email',
      variable: 'Email',
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
    column: 'RazonSocial',
    descending: false
  };
  hdrbtns: any[] = [];
  gridbtns: any[] = [];
  initGridButton() {

    this.hdrbtns = [
      {
        title: 'Nuevo Proveedor',
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
    private proveedorServices: ProveedoresService, private dialog: MatDialog) { }
  openDialog() {
    let dialogRef = this.dialog.open(EditProveedoresComponent);
    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.proveedor = this.proveedor;

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.loadFermentadores();
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
    this.loadFermentadores();

  }
  loadFermentadores(): void {
    this.proveedores = [];
    this.proveedorServices.getAll()
      .subscribe(proveedores => { this.proveedores = proveedores; this.initGridButton(); });
  }

  AddProveedor() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Agrega Nuevo Proveedor";
    this.modalBtnTitle = "Guardar";
    this.openDialog();
  }
  EditProveedor(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Edit Proveedor";
    this.modalBtnTitle = "Update";
    this.proveedor = this.proveedores.find(x => x.id === id);

    this.openDialog();
  }
  DeleteProveedor(id: number) {
    this.dbops = DBOperation.delete;
    this.proveedorServices.delete(id).subscribe(() => {
      this._snack.openSnackBar("Proveedor Eliminado", 'Success');
      this.loadFermentadores();
    }, error => {
      this._snack.openSnackBar(error, 'Error');


    });
  }

  gridaction(gridaction: any): void {

    switch (gridaction.action) {
      case DBOperation.create:
        this.AddProveedor();
        break;
      case DBOperation.update:
        this.EditProveedor(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.DeleteProveedor(gridaction.values[0].value);
        break;
    }

  }
}

