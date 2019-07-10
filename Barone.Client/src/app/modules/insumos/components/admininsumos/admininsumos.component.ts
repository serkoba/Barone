import { Component, OnInit } from '@angular/core';
import { InsumoModel } from 'src/app/modules/shared/models/insumo.model';
import { DBOperation } from 'src/app/core/enum/enum.enum';
import { SnackManagerService } from 'src/app/core/core.module.export';
import { InsumosService } from '../../services/insumos.service';
import { MatDialog } from '@angular/material';
import { EditInsumosComponent } from '../edit-insumos/edit-insumos.component';

@Component({
  selector: 'admininsumos',
  templateUrl: './admininsumos.component.html',
  styleUrls: ['./admininsumos.component.scss']
})
export class AdmininsumosComponent implements OnInit {
  insumos: InsumoModel[];
  isREADONLY: boolean = false;
  exportFileName: string = "insumo_";
  dbops: DBOperation;
  msg: string;
  modalTitle: string;
  modalBtnTitle: string;
  insumo: InsumoModel;
  //Grid Vars start
  columns: any[] = [
    {
      display: 'Nombre',
      variable: 'Nombre',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Unidad de Medida',
      variable: 'TipoUnidadMedida',
      filter: 'unidadmedida',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Stock',
      variable: 'Stock',
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
  hdrbtns: any[] = [];
  gridbtns: any[] = [];
  initGridButton() {

    this.hdrbtns = [
      {
        title: 'Nuevo Insumo',
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
    private insumosServices: InsumosService, private dialog: MatDialog) { }
  openDialog() {
    let dialogRef = this.dialog.open(EditInsumosComponent);
    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.insumo = this.insumo;

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.loadInsumos();
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
    this.loadInsumos();

  }
  loadInsumos(): void {
    this.insumos = [];
    this.insumosServices.getAll()
      .subscribe(proveedores => { this.insumos = proveedores; this.initGridButton(); });
  }

  AddInsumo() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Agrega Nuevo Insumo";
    this.modalBtnTitle = "Guardar";
    this.openDialog();
  }
  EditInsumo(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Edit Insumo";
    this.modalBtnTitle = "Update";
    this.insumo = this.insumos.find(x => x.id === id);

    this.openDialog();
  }
  DeleteInsumos(id: number) {
    this.dbops = DBOperation.delete;
    this.insumosServices.delete(id).subscribe(() => {
      this._snack.openSnackBar("Insumo Eliminado", 'Success');
      this.loadInsumos();
    }, error => {
      this._snack.openSnackBar(error, 'Error');


    });
  }

  gridaction(gridaction: any): void {

    switch (gridaction.action) {
      case DBOperation.create:
        this.AddInsumo();
        break;
      case DBOperation.update:
        this.EditInsumo(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.DeleteInsumos(gridaction.values[0].value);
        break;
    }

  }
}

