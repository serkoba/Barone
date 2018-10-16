import { Component, OnInit } from '@angular/core';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../services/users.service';
import { UserPipe } from '../../../shared/filters/user.pipe';
import { MatDialog } from '@angular/material';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {
  users: User[];
  isREADONLY: boolean = false;
  exportFileName: string = "Users_";
  dbops: DBOperation;
  msg: string;
  modalTitle: string;
  modalBtnTitle: string;
  user: User;
  //Grid Vars start
  columns: any[] = [
    {
      display: 'User Profile',
      variable: 'userProfile',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Tipo de Usuario',
      variable: 'Role',
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
    column: 'userProfile',
    descending: false
  };
  hdrbtns: any[] = [];
  gridbtns: any[] = [];
  initGridButton() {

    this.hdrbtns = [
      {
        title: 'Nuevo Usuario',
        keys: [''],
        action: DBOperation.create,
        ishide: this.isREADONLY

      }];
    this.gridbtns = [
      {
        title: 'Edit',
        keys: ['idUser'],
        action: DBOperation.update,
        ishide: this.isREADONLY
      },
      {
        title: 'X',
        keys: ["idUser"],
        action: DBOperation.delete,
        ishide: this.isREADONLY
      }

    ];
  }

  constructor(private userServices: UserService, public userFilter: UserPipe, private dialog: MatDialog) { }
  openDialog() {
    let dialogRef = this.dialog.open(EditUserComponent);
    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.user = this.user;

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.LoadUsers();
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
    this.LoadUsers();

  }
  LoadUsers(): void {
    this.users = [];
    // let video: videos = { id: 23, titulo: "nuevo", video: "rivieramaya.mp4", imagen: "rivera.jpg", fecha: "2012/12/12",pdf:"archivo.pdf",activo:"1",curso:"1",descripcion:"nuevo",modulo:"1"};
    // this.video = video;
    this.userServices.getAll()
      .subscribe(users => { this.users = users; this.initGridButton(); });
    //  let user: User = {
    //    id: 1, apellido: "Perez", mail: "karinaperez@gmail.com", nombre: "Karina", sexo: "famel", telefono: "123123123", celular: "123123123", facebook: "asf"
    //    , foto: "asdasd", dni: "123123123", cuilCuit: "12312312312", ciudad: "Bahia", provincia: "asdasd", pais: "Argentina", pass: "123123", tipoUsuario: "admin", activo: "asdasd", fecha: "2012/12/12", inicioSesion: "", comentarios: "",
    //    admin: "", descripcion: "", estacoCivil: "", estadoCivil: "", fechaNacimiento: "", fotoFile: "", idiomas: "", instagram: "", tiempoTotal: ""
    //  }
    // this.arrVideos = [video];
    // this.initGridButton(); 
    // this.users.push(user);
    /* this.userServices.getAll()
       .subscribe(users => { this.users = users; this.initGridButton(); }
       );*/
  }

  addUser() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Agrega Nuevo video";
    this.modalBtnTitle = "Guardar";
    this.openDialog();
  }
  EditUser(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Edit User";
    this.modalBtnTitle = "Update";
    //   this.userServices.getById(id).then(val => { this.user = Object.assign(new User(), val); this.openDialog(); });;
    //   this.openDialog();
  }
  deleteUser(id: number) {
    this.dbops = DBOperation.delete;
    ///   this.modalTitle = "Confirm to Delete?";
    ///   this.modalBtnTitle = "Delete";
    ///   this.user = this.users.filter(x => x.Id == id)[0];
    ///   this.openDialog();
  }

  gridaction(gridaction: any): void {

    switch (gridaction.action) {
      case DBOperation.create:
        this.addUser();
        break;
      case DBOperation.update:
        this.EditUser(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.deleteUser(gridaction.values[0].value);
        break;
    }

  }
}