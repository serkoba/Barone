import { Component, OnInit } from '@angular/core';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { ClientsModel } from '../../../shared/models/clients.model';
import { MatDialog } from '@angular/material';
import { ClientPipe } from '../../../shared/filters/client.pipe';
import { ClientsService } from '../../services/clients.service';
import { EditClientsComponent } from '../edit-clients/edit-clients.component';
import { SnackManagerService } from '../../../../core/core.module.export';

@Component({
  selector: 'app-adminclients',
  templateUrl: './adminclients.component.html',
  styleUrls: ['./adminclients.component.css']
})
export class AdminclientsComponent implements OnInit {
  clients: ClientsModel[];
  isREADONLY: boolean = false;
  exportFileName: string = "clients_";
  dbops: DBOperation;
  msg: string;
  modalTitle: string;
  modalBtnTitle: string;
  client: ClientsModel;
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
      display: 'CUIT',
      variable: 'CUIT',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'domicilio',
      variable: 'domicilio',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Saldo',
      variable: 'SaldoCuenta',
      filter: 'currency',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Descripcion',
      variable: 'description',
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
        title: 'Nuevo Cliente',
        keys: [''],
        action: DBOperation.create,
        ishide: this.isREADONLY

      }];
    this.gridbtns = [
      {
        title: 'Editar',
        icon: 'create',
        keys: ['IdCliente'],
        action: DBOperation.update,
        ishide: this.isREADONLY
      },
      {
        title: 'Borrar',
        icon: 'clear',
        keys: ["IdCliente"],
        action: DBOperation.delete,
        ishide: this.isREADONLY
      }

    ];
  }

  constructor(private _snack: SnackManagerService,
    private clientsServices: ClientsService, public clientFilter: ClientPipe, private dialog: MatDialog) { }
  openDialog() {
    let dialogRef = this.dialog.open(EditClientsComponent);
    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.client = this.client;

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.LoadClients();
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
    this.LoadClients();

  }
  LoadClients(): void {
    this.clients = [];
    // let video: videos = { id: 23, titulo: "nuevo", video: "rivieramaya.mp4", imagen: "rivera.jpg", fecha: "2012/12/12",pdf:"archivo.pdf",activo:"1",curso:"1",descripcion:"nuevo",modulo:"1"};
    // this.video = video;
    this.clientsServices.getAll()
      .subscribe(clients => { this.clients = clients; this.initGridButton(); });
    //  let client: ClientsModel = {
    //    IdCliente: 1, RazonSocial: "Perez", Telefono: "123123123"
    //    , DNI: "123123123", CUIT: "12312312312", ciudad: "Bahia", provincia: "asdasd", pais: "Argentina",
    //    SaldoCuenta: "",domicilio:"",margen:"0"
    //  }
    // // this.arrVideos = [video];
    //  this.initGridButton(); 
    //  this.clients.push(client);
    /* this.userServices.getAll()
       .subscribe(users => { this.users = users; this.initGridButton(); }
       );*/
  }

  addClient() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Agrega Nuevo Cliente";
    this.modalBtnTitle = "Guardar";
    this.openDialog();
  }
  EditClient(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Edit Client";
    this.modalBtnTitle = "Update";
    this.client = this.clients.find(x => x.IdCliente === id);
    //   this.userServices.getById(id).then(val => { this.user = Object.assign(new User(), val); this.openDialog(); });;
    this.openDialog();
  }
  deleteClient(id: number) {
    this.dbops = DBOperation.delete;
    this.clientsServices.delete(id).subscribe(() => {
      // this.dialogRef.close("success");
      this._snack.openSnackBar("Estilos Eliminado", 'Success');
      this.LoadClients();
    }, error => {
      this._snack.openSnackBar(error, 'Error');
      //  this.dialogRef.close("error");

    });
  }

  gridaction(gridaction: any): void {

    switch (gridaction.action) {
      case DBOperation.create:
        this.addClient();
        break;
      case DBOperation.update:
        this.EditClient(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.deleteClient(gridaction.values[0].value);
        break;
    }

  }
}
