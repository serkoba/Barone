import { Component, OnInit } from '@angular/core';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { MatDialog } from '@angular/material';
import { RangoModel } from '../../../shared/models/rango.model';
import { RangosService } from '../../services/rangos.service';
import { RangoPipe } from '../../../shared/filters/rango.pipe';
import { EditRangosComponent } from '../edit-rangos/edit-rangos.component';
import { SnackManagerService } from '../../../../core/core.module.export';


@Component({
  selector: 'adminrangos',
  templateUrl: './adminrangos.component.html',
  styleUrls: ['./adminrangos.component.css']
})
export class AdminrangosComponent implements OnInit {
  rangos: RangoModel[];
  isREADONLY: boolean = false;
  exportFileName: string = "clients_";
  dbops: DBOperation;
  msg: string;
  modalTitle: string;
  modalBtnTitle: string;
  rango: RangoModel;
  //Grid Vars start
  columns: any[] = [
    {
      display: 'Nombre Rango',
      variable: 'NombreRango',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Fecha Desde',
      variable: 'fechaDesde',
      filter: 'date',
      template: 'text'
    },
    {
      display: 'Fecha Hasta',
      variable: 'fechaHasta',
      filter: 'date',
      template: 'text'
    },
    {
      display: 'Precio',
      variable: 'precio',
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
    column: 'NombreRango',
    descending: false
  };
  hdrbtns: any[] = [];
  gridbtns: any[] = [];
  initGridButton() {

    this.hdrbtns = [
      {
        title: 'Nuevo Rango',
        keys: [''],
        action: DBOperation.create,
        ishide: this.isREADONLY

      }];
    this.gridbtns = [
      {
        title: 'Editar',
        keys: ['idRango'],
        icon: 'create',
        action: DBOperation.update,
        ishide: this.isREADONLY
      },
      {
        title: 'Borrar',
        icon: 'clear',
        keys: ["idRango"],
        action: DBOperation.delete,
        ishide: this.isREADONLY
      }

    ];
  }

  constructor(private rangosServices: RangosService, public rangoFilter: RangoPipe, private dialog: MatDialog, private _snack: SnackManagerService) { }
  openDialog() {
    let dialogRef = this.dialog.open(EditRangosComponent);
    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.rango = this.rango;

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.loadRangos();
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
    this.loadRangos();

  }
  loadRangos(): void {
    this.rangos = [];
   
    this.rangosServices.getAll()
      .subscribe(rangos => { this.rangos = rangos; this.initGridButton(); });
   
  }

  addRango() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Agrega Nuevo Rango";
    this.modalBtnTitle = "Guardar";
    this.openDialog();
  }
  EditRango(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Edit Rango";
    this.modalBtnTitle = "Update";
    this.rango = this.rangos.find(x => x.idRango === id);
    //   this.userServices.getById(id).then(val => { this.user = Object.assign(new User(), val); this.openDialog(); });;
    this.openDialog();
  }
  deleteRango(id: number) {
    this.dbops = DBOperation.delete;
    this.rangosServices.delete(id).subscribe(() => {
      // this.dialogRef.close("success");
      this._snack.openSnackBar("Rango Eliminado", 'Success');
      this.loadRangos();
    }, error => {
      this._snack.openSnackBar(error, 'Error');
      //  this.dialogRef.close("error");

    });
  }

  gridaction(gridaction: any): void {

    switch (gridaction.action) {
      case DBOperation.create:
        this.addRango();
        break;
      case DBOperation.update:
        this.EditRango(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.deleteRango(gridaction.values[0].value);
        break;
    }

  }
}
