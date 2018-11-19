import { Component, OnInit } from '@angular/core';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { ClientsModel } from '../../../shared/models/clients.model';
import { MatDialogRef } from '@angular/material';
import { ClientsService } from '../../services/clients.service';
import { SnackBarComponent, SnackManagerService } from '../../../../core/core.module.export';

@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.scss']
})
export class EditClientsComponent implements OnInit {

  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  client: ClientsModel;

  filteredStates: any;
  constructor(private _snack: SnackManagerService,
    private clientesServices: ClientsService,
    public dialogRef: MatDialogRef<EditClientsComponent>) { }

  ngOnInit() {
    if (typeof (this.client) == "undefined")
      this.client = new ClientsModel();
  }
  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:

        this.clientesServices.insert(this.client).subscribe((result) => {
          this.client.IdCliente = result.IdCliente;
          this.dialogRef.close("success");
          this._snack.openSnackBar("Estilo Creado Exitosamente", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.update:

        this.clientesServices.update(this.client).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Estilo Actualizado", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.delete:

        this.clientesServices.delete(this.client.IdCliente).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Estilo Eliminado", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;

    }
  }
}
