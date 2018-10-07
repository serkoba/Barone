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
    },
    {
      display: 'Fecha Desde',
      variable: 'fechaDesde',
      filter: 'text'
    },
    {
      display: 'Fecha Hasta',
      variable: 'fechaHasta',
      filter: 'text'
    },
    {
      display: 'Precio',
      variable: 'precio',
      filter: 'text'
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
        icon:'create',
        action: DBOperation.update,
        ishide: this.isREADONLY
      },
      {
        title: 'Borrar',
        icon:'clear',
        keys: ["idRango"],
        action: DBOperation.delete,
        ishide: this.isREADONLY
      }

    ];
  }

  constructor(private rangosServices: RangosService, public rangoFilter: RangoPipe, private dialog: MatDialog, private _snack:SnackManagerService) { }
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
this.rangos =[];
    // let video: videos = { id: 23, titulo: "nuevo", video: "rivieramaya.mp4", imagen: "rivera.jpg", fecha: "2012/12/12",pdf:"archivo.pdf",activo:"1",curso:"1",descripcion:"nuevo",modulo:"1"};
    // this.video = video;
    this.rangosServices.getAll()
      .subscribe(rangos => { this.rangos = rangos; this.initGridButton(); });
    //  let client:  RangoModel= {
    //    id: 1, NombreRango: "Perez", fechaDesde: "01/01/2018"
    //    , fechaHasta: "12/12/2018", precio: "100"
    //  }
    // // this.arrVideos = [video];
    //  this.initGridButton(); 
    //  this.rangos.push(client);
    /* this.userServices.getAll()
       .subscribe(users => { this.users = users; this.initGridButton(); }
       );*/
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
       this.rango= this.rangos.find(x=> x.idRango===id);
    //   this.userServices.getById(id).then(val => { this.user = Object.assign(new User(), val); this.openDialog(); });;
       this.openDialog();
  }
  deleteRango(id: number) {
    this.dbops = DBOperation.delete;
    this.rangosServices.delete(id).subscribe(()=>{
     // this.dialogRef.close("success");
      this._snack.openSnackBar("Rango Eliminado",'Success');
      this.loadRangos();
     },error =>{
      this._snack.openSnackBar(error,'Error');
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
