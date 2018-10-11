import { Component, OnInit } from '@angular/core';
import { EntregaModel } from '../../../shared/models/entrega.model';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { MatDialog } from '@angular/material';
import { EditEntregasComponent } from '../edit-entregas/edit-entregas.component';
import { ButtonType } from '../../../modules.export';
import { EntregasService } from '../../services/entregas.service';
import { EntregasPipe } from '../../../shared/filters/entregas.pipe';
import { ClientsModel } from '../../../shared/models/clients.model';
import { SnackManagerService } from '../../../../core/core.module.export';

@Component({
  selector: 'adminentregas',
  templateUrl: './adminentregas.component.html',
  styleUrls: ['./adminentregas.component.scss']
})
export class AdminentregasComponent implements OnInit {
  entregas: EntregaModel[];
  isREADONLY: boolean = false;
  exportFileName: string = "clients_";
  dbops: DBOperation;
  msg: string;
  modalTitle: string;
  modalBtnTitle: string;
  entrega: EntregaModel;
  //Grid Vars start
  columns: any[] = [
    {
      display: 'Fecha ',
      variable: 'fecha',
      filter: 'text',
    },
    {
      display: 'Fecha Pactada',
      variable: 'fechaPactada',
      filter: 'text'
    },
    {
      display: 'Cliente',
      variable: 'RazonSocial',
      filter: 'text'
    },
    {
      display: 'Nro de Remito',
      variable: 'idEntrega',
      filter: 'text'
    },
    {
      display: 'Total',
      variable: 'TotalImporte',
      filter: 'text'
    },
    {
      display: 'Estado',
      variable: 'Estado',
      filter: 'text'
    }
  ];
  sorting: any = {
    column: 'fechaPactada',
    descending: false
  };
  hdrbtns: any[] = [];
  gridbtns: any[] = [];
  initGridButton() {

    this.hdrbtns = [
      {
        title: 'Nueva Entrega',
        keys: [''],
        action: DBOperation.create,
        ishide: this.isREADONLY

      },
      {
        title: 'Comenzar entrega',
        keys: [''],
        action: DBOperation.ComenzarEntrega,
        ishide: this.isREADONLY

      }];
    this.gridbtns = [
      {
        title: 'Editar',
        icon: 'create',
        keys: ['idEntrega'],
        action: DBOperation.update,
        ishide: this.isREADONLY
      },
      {
        title: 'Borrar',
        icon: 'clear',
        keys: ["idEntrega"],
        action: DBOperation.delete,
        ishide: this.isREADONLY
      }

    ];
  }

  constructor(private _snack: SnackManagerService,
    private entregaServices: EntregasService, public entregasFilter: EntregasPipe, private dialog: MatDialog) { }
  public openDialog() {
    let dialogRef = null;

    dialogRef = this.dialog.open(EditEntregasComponent);

    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.entrega = this.entrega;

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.loadEntregas();
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
    this.loadEntregas();

  }
  loadEntregas(): void {
    this.entregas = [];
    // let video: videos = { id: 23, titulo: "nuevo", video: "rivieramaya.mp4", imagen: "rivera.jpg", fecha: "2012/12/12",pdf:"archivo.pdf",activo:"1",curso:"1",descripcion:"nuevo",modulo:"1"};
    // this.video = video;
    // this.userServices.getAll()
    //   .subscribe(users => { this.users = users; this.initGridButton(); });

    this.entregaServices.getAll()
      .subscribe(entregas => {
        this.entregas = entregas;
        this.initGridButton();
      });

    //  let entrega: EntregaModel = {
    //    id: 1, fechaPactada: "01/01/2018", fecha: "01/01/2018"
    //    , TotalBarriles: "70", Barriles: [{  id: 1, NroBarril: "002"
    //    , CantidadLitros: "70",  idEstado: 1}], Cliente:{  IdCliente: 1, RazonSocial: "Perez", Telefono: "123123123"
    //    , DNI: "123123123", CUIT: "12312312312", ciudad: "Bahia", provincia: "asdasd", pais: "Argentina",
    //    SaldoCuenta: "",domicilio:"",margen:"0"},Estado:"1",TotalImporte:"200",TotalLitros:"200",
    //    Pedido:{  id: 1, fechaPactada: "01/01/2018", fechaPedido: "01/01/2018", IdCliente:1, Estado:"1"
    //    , TotalBarriles: 70, Cliente: new ClientsModel(), DetallePedido: "IPA,HONEY"}
    //  }
    // // this.arrVideos = [video];
    //  this.initGridButton(); 
    //  this.entregas.push(entrega);
    /* this.userServices.getAll()
       .subscribe(users => { this.users = users; this.initGridButton(); }
       );*/
  }

  addEntrega() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Agrega Nueva Entrega";
    this.modalBtnTitle = "Guardar";
    this.openDialog();
  }
  EditEntrega(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Editar Entrega";
    this.modalBtnTitle = "Update";

    this.entrega = this.entregas.find(x => x.idEntrega === id);
    this.entrega.DetalleEntrega = JSON.parse(this.entrega.DetallePedido.toString());
    //   this.userServices.getById(id).then(val => { this.user = Object.assign(new User(), val); this.openDialog(); });;
    this.openDialog();
    //   this.userServices.getById(id).then(val => { this.user = Object.assign(new User(), val); this.openDialog(); });;
    //   this.openDialog();
  }
  DeleteEntrega(id: number) {
    this.dbops = DBOperation.delete;
    this.entregaServices.delete(id).subscribe(() => {
      // this.dialogRef.close("success");
      this._snack.openSnackBar("Entrega Eliminado", 'Success');
      this.loadEntregas();
    }, error => {
      this._snack.openSnackBar(error, 'Error');
    });
  }



  gridaction(gridaction: any): void {

    switch (gridaction.action) {
      case DBOperation.create:
        this.addEntrega();
        break;
      case DBOperation.update:
        this.EditEntrega(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.DeleteEntrega(gridaction.values[0].value);
        break;

    }

  }
}

