import { Component, OnInit } from '@angular/core';
import { EstilosModel } from '../../../shared/models/estilos.model';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { EstilosService } from '../../services/estilos.service';
import { EstilosPipe } from '../../../shared/filters/estilos.pipe';
import { MatDialog } from '@angular/material';
import { EditEstilosComponent } from '../edit-estilos/edit-estilos.component';
import { SnackManagerService } from '../../../../core/core.module.export';

@Component({
  selector: 'adminestilos',
  templateUrl: './adminestilos.component.html',
  styleUrls: ['./adminestilos.component.scss']
})
export class AdminestilosComponent implements OnInit {
  estilos: EstilosModel[];
  isREADONLY: boolean = false;
  exportFileName: string = "clients_";
  dbops: DBOperation;
  msg: string;
  modalTitle: string;
  modalBtnTitle: string;
  estilo: EstilosModel;
  //Grid Vars start
  columns: any[] = [
    {
      display: 'Nombre Rango',
      variable: 'Nombre',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Fecha Desde',
      variable: 'rangoPrecio',
      filter: 'rangoPrecio.fechaDesde',
      template: 'text'
    },
    {
      display: 'Fecha Hasta',
      variable: 'rangoPrecio',
      filter: 'rangoPrecio.fechaHasta',
      template: 'text'
    },
    {
      display: 'Precio',
      variable: 'rangoPrecio',
      filter: 'rangoPrecio.precio',
      template: 'text'
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
        title: 'Nuevo Estilo',
        keys: [''],
        action: DBOperation.create,
        ishide: this.isREADONLY

      }];
    this.gridbtns = [
      {
        title: 'Editar',
        keys: ['IdEstilo'],
        icon: 'create',
        action: DBOperation.update,
        ishide: this.isREADONLY
      },
      {
        title: 'Borrar',
        icon: 'clear',
        keys: ["IdEstilo"],
        action: DBOperation.delete,
        ishide: this.isREADONLY
      }

    ];
  }

  constructor(private estilosServices: EstilosService, public estiloFilter: EstilosPipe, private dialog: MatDialog, private _snack: SnackManagerService) { }
  openDialog() {
    let dialogRef = this.dialog.open(EditEstilosComponent);
    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.estilo = this.estilo;

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.loadEstilos();
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
    this.loadEstilos();

  }
  loadEstilos(): void {
    this.estilos = [];
    // let video: videos = { id: 23, titulo: "nuevo", video: "rivieramaya.mp4", imagen: "rivera.jpg", fecha: "2012/12/12",pdf:"archivo.pdf",activo:"1",curso:"1",descripcion:"nuevo",modulo:"1"};
    // this.video = video;
    this.estilosServices.getAll()
      .subscribe(estilos => { this.estilos = estilos; this.initGridButton(); });
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

  addEstilos() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Agrega Nuevo Rango";
    this.modalBtnTitle = "Guardar";
    this.openDialog();
  }
  editEstilos(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Edit Rango";
    this.modalBtnTitle = "Update";
    this.estilo = this.estilos.find(x => x.IdEstilo === id);
    //   this.userServices.getById(id).then(val => { this.user = Object.assign(new User(), val); this.openDialog(); });;
    this.openDialog();
  }
  deleteEstilos(id: number) {
    this.dbops = DBOperation.delete;
    this.estilosServices.delete(id).subscribe(() => {
      // this.dialogRef.close("success");
      this._snack.openSnackBar("Estilos Eliminado", 'Success');
      this.loadEstilos();
    }, error => {
      this._snack.openSnackBar(error, 'Error');
      //  this.dialogRef.close("error");

    });
  }

  gridaction(gridaction: any): void {

    switch (gridaction.action) {
      case DBOperation.create:
        this.addEstilos();
        break;
      case DBOperation.update:
        this.editEstilos(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.deleteEstilos(gridaction.values[0].value);
        break;
    }

  }
}
