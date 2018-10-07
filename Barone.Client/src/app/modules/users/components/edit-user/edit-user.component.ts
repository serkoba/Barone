import { Component, OnInit } from '@angular/core';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { User } from '../../../shared/models/user.model';
import { MatDialogRef } from '@angular/material';

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
  constructor(public dialogRef: MatDialogRef<EditUserComponent>) { }

  ngOnInit() {
    if (typeof (this.user) == "undefined")
    this.user = new User();
  }
  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:
        /* this._userService.post(Global.BASE_USER_ENDPOINT, formData.value).subscribe(
           data => {
             if (data == 1) //Success
             {
               this.dialogRef.close("success");
             }
             else {
               this.dialogRef.close("error");
             }
           },
           error => {
             this.dialogRef.close("error");
           }
         );*/
        break;
      case DBOperation.update:
        /*   this._userService.put(Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(
             data => {
               if (data == 1) //Success
               {
                 this.dialogRef.close("success");
               }
               else {
                 this.dialogRef.close("error");
               }
             },
             error => {
               this.dialogRef.close("error");
             }
           );*/
        break;
      case DBOperation.delete:
        /*  this._userService.delete(Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(
            data => {
              if (data == 1) //Success
              {
                this.dialogRef.close("success");
              }
              else {
                this.dialogRef.close("error");
              }
            },
            error => {
              this.dialogRef.close("error");
            }
          );*/
        break;

    }
  }

}