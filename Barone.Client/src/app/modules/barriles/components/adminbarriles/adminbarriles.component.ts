import { Component, OnInit } from '@angular/core';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { BarrilModel } from '../../../shared/models/barril.model';
import { MatDialog } from '@angular/material';
import { EditBarrilesComponent } from '../edit-barriles/edit-barriles.component';
import { BarrilesService } from '../../services/barriles.service';
import { BarrilPipe } from '../../../shared/filters/barril.pipe';
import { BarrilesEstadoComponent } from '../barriles-estado/barriles-estado.component';
import { BarrilesEstiloComponent } from '../barriles-estilo/barriles-estilo.component';
import { ButtonType } from '../../../shared/enum/enums';
import { SnackManagerService } from '../../../../core/core.module.export';

@Component({
  selector: 'adminbarriles',
  templateUrl: './adminbarriles.component.html',
  styleUrls: ['./adminbarriles.component.css']
})
export class AdminbarrilesComponent  implements OnInit {
  barriles: BarrilModel[];
  isREADONLY: boolean = false;
  exportFileName: string = "clients_";
  dbops: DBOperation;
  msg: string;
  modalTitle: string;
  modalBtnTitle: string;
  barril: BarrilModel;
  hdrbtns: any[] = [];
  gridbtns: any[] = [];
  //Grid Vars start
  columns: any[] = [
    {
      display: 'Nro de Barril',
      variable: 'NroBarril',
      filter: 'text',
    },
    {
      display: 'Estado',
      variable: 'idEstado',
      filter: 'text'
    },
    {
      display: 'Estilo',
      variable: 'Estilo',
      filter: 'text'
    },
    {
      display: 'Cant. Litros',
      variable: 'CantidadLitros',
      filter: 'text'
    }
  ];
  sorting: any = {
    column: 'NroBarril',
    descending: false
  };
  
  public initGridButton() {

    this.hdrbtns = [
      {
        title: 'Nuevo Barril',
        keys: [''],
        action: DBOperation.create,
        ishide: this.isREADONLY

      },
      {
        title: 'Cambiar Estados/Estilo a  Barriles',
        keys: [''],
        action: DBOperation.CambiarEstadoBarriles,
        ishide: this.isREADONLY

      }];
    this.gridbtns = [
      {
        title: 'Editar',
        icon:'create',
        keys: ['id'],
        action: DBOperation.update,
        ishide: this.isREADONLY
      },
      {
        title: 'Borrar',
        icon:'clear',
        keys: ["id"],
        action: DBOperation.delete,
        ishide: this.isREADONLY
      }

    ];
  }

  constructor(private _snack:SnackManagerService, private barrilesServices: BarrilesService, public barrilFilter: BarrilPipe, private dialog: MatDialog) { }
  public openDialog(type:string) {
    let dialogRef = null;
    switch (type) {
      case ButtonType.Barril:
        dialogRef= this.dialog.open(EditBarrilesComponent);
        break;
      case ButtonType.BarrilEstado:
        dialogRef= this.dialog.open(BarrilesEstadoComponent);
      break;   
      case ButtonType.BarrilEstilo:
      dialogRef=this.dialog.open(BarrilesEstiloComponent);
      break;
      default:
        break;
    }
    
    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.barril = this.barril;

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.loadBarriles();
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
            case DBOperation.CambiarEstadoBarriles:
            this.msg = "Barriles Actualizados"
            break;
            case DBOperation.CambiarEstadoBarriles:
            this.msg = "Barriles Actualizados"
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
    this.loadBarriles();

  }
  loadBarriles(): void {
this.barriles =[];
this.barrilesServices.getAll()
      .subscribe(barriles => { this.barriles = barriles; this.initGridButton(); });
    // let video: videos = { id: 23, titulo: "nuevo", video: "rivieramaya.mp4", imagen: "rivera.jpg", fecha: "2012/12/12",pdf:"archivo.pdf",activo:"1",curso:"1",descripcion:"nuevo",modulo:"1"};
    // this.video = video;
    // this.userServices.getAll()
    //   .subscribe(users => { this.users = users; this.initGridButton(); });
    //  let barril: BarrilModel = {
    //    id: 1, NroBarril: "002", Estilo: "1"
    //    , CantidadLitros: "70", IdCliente: "1", idEstado: "1"
    //  }
    // // this.arrVideos = [video];
    //  this.initGridButton(); 
    //  this.barriles.push(barril);
    /* this.userServices.getAll()
       .subscribe(users => { this.users = users; this.initGridButton(); }
       );*/
  }

  addBarril() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Agrega Nuevo Barril";
    this.modalBtnTitle = "Guardar";
    this.openDialog(ButtonType.Barril);
  }
  EditBarril(id: number) {
    this.dbops = DBOperation.update;
      this.modalTitle = "Edit Barril";
       this.modalBtnTitle = "Update";
       this.barril = this.barriles.find(x=> x.id==id);
    //   this.userServices.getById(id).then(val => { this.user = Object.assign(new User(), val); this.openDialog(); });;
       this.openDialog(ButtonType.Barril);
  }
  DeleteBarril(id: number) {
    this.dbops = DBOperation.delete;
    this.barrilesServices.delete(id).subscribe(()=>{
      // this.dialogRef.close("success");
       this._snack.openSnackBar("Barril Eliminado",'Success');
       this.loadBarriles();
      },error =>{
       this._snack.openSnackBar(error,'Error');
      //  this.dialogRef.close("error");
        
      });
    ///   this.modalTitle = "Confirm to Delete?";
    ///   this.modalBtnTitle = "Delete";
    ///   this.user = this.users.filter(x => x.Id == id)[0];
    ///   this.openDialog();
  }
  public CambiarEstadoBarriles(){
      this.modalTitle="Cambiar Estado a un Barril";
      this.modalBtnTitle="Guardar";
      this.openDialog(ButtonType.BarrilEstado);
  }

  public CambiarEstiloBarriles(){
    this.modalTitle="Cambiar Estilo a un Barril";
    this.modalBtnTitle="Guardar";
    this.openDialog(ButtonType.BarrilEstilo);
}


  public gridaction(gridaction: any): void {

    switch (gridaction.action) {
      case DBOperation.create:
        this.addBarril();
        break;
      case DBOperation.update:
        this.EditBarril(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.DeleteBarril(gridaction.values[0].value);
        break;
        case DBOperation.CambiarEstadoBarriles:
        this.CambiarEstadoBarriles();
        break;
        case DBOperation.CambiarEstiloBarriles:
        this.CambiarEstiloBarriles();
        break;
    }

  }
}

