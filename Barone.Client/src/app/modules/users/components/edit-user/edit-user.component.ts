import { Component, OnInit } from '@angular/core';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { User } from '../../../shared/models/user.model';
import { MatDialogRef } from '@angular/material';
import { UserService } from '../../services/users.service';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { SnackManagerService } from 'src/app/core/core.module.export';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  user: User;
  TipoUsuario = [
    'Admin',
    'Invitado'
  ];

  filteredStates: any;
  constructor(private _snack: SnackManagerService, public userServices:UserService,public dialogRef: MatDialogRef<EditUserComponent>) { }

  ngOnInit() {
    if (typeof (this.user) == "undefined")
    this.user = new User();
  }
  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:
        this.userServices.insert(this.user)
        .subscribe(() => {
        
          this.dialogRef.close("success");
          this._snack.openSnackBar("Usuario Creado Exitosamente", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });
        break;
      case DBOperation.update:
        this.userServices.update(this.user)
        .subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Usuario Actualizado", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });
        break;
      case DBOperation.delete:
        this.userServices.delete(this.user.idUser)
        .subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Pago Eliminado", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });
        break;

    }
  }

}