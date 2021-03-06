import { Component, OnInit } from '@angular/core';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { PagosModel } from '../../../shared/models/pagos.model';
import { MatDialog } from '@angular/material';
import { PagosService } from '../../services/pagos.service';
import { PagosPipe } from '../../../shared/filters/pagos.pipe';
import { EditPagosComponent } from '../edit-pagos/edit-pagos.component';
import { ClientsModel } from '../../../shared/models/clients.model';
import { SnackManagerService } from '../../../../core/core.module.export';

@Component({
  selector: 'adminpagos',
  templateUrl: './adminpagos.component.html',
  styleUrls: ['./adminpagos.component.scss']
})
export class AdminpagosComponent implements OnInit {
  pagos: PagosModel[];
  isREADONLY: boolean = false;
  exportFileName: string = "pagos_";
  dbops: DBOperation;
  msg: string;
  modalTitle: string;
  modalBtnTitle: string;
  pago: PagosModel;
  //Grid Vars start
  columns: any[] = [
    {
      display: 'Fecha Pago',
      variable: 'FechaPago',
      filter: 'date',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Tipo',
      variable: 'Tipo',
      filter: 'Pago',
      template:'text',
      Sumarizable:false
    },
    {
      display: 'Fecha Vencimiento',
      variable: 'fechaVencimiento',
      filter: 'date',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Cliente',
      variable: 'Cliente',
      filter: 'Cliente',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Importe',
      variable: 'Importe',
      filter: 'currency',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Descripcion',
      variable: 'Descripcion',
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
    column: 'Cliente.RazonSocial',
    descending: false
  };
  hdrbtns: any[] = [];
  gridbtns: any[] = [];
  initGridButton() {

    this.hdrbtns = [
      {
        title: 'Nuevo Pago',
        keys: [''],
        action: DBOperation.create,
        ishide: this.isREADONLY

      }];
    this.gridbtns = [
      {
        title: 'Editar',
        icon: 'create',
        keys: ['idPago'],
        action: DBOperation.update,
        ishide: this.isREADONLY
      },
      {
        title: 'Borrar',
        icon: 'clear',
        keys: ["idPago"],
        action: DBOperation.delete,
        ishide: this.isREADONLY
      }

    ];
  }

  constructor(private _snack: SnackManagerService,
    private pagosServices: PagosService, public pagosFilter: PagosPipe, private dialog: MatDialog) { }
  openDialog() {
    let dialogRef = this.dialog.open(EditPagosComponent);
    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.pago = this.pago;

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.LoadPagos();
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
    this.LoadPagos();

  }
  LoadPagos(): void {
    this.pagos = [];
   
    this.pagosServices.getAll()
      .subscribe(pagos => { this.pagos = pagos; this.initGridButton(); });
   
  }

  addPago() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Agrega Nuevo Pago";
    this.modalBtnTitle = "Guardar";
    this.openDialog();
  }
  EditPago(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Edit Pago";
    this.modalBtnTitle = "Update";
    this.pago = this.pagos.find(x => x.idPago === id);
    //   this.userServices.getById(id).then(val => { this.user = Object.assign(new User(), val); this.openDialog(); });;
    this.openDialog();
  }
  deletePago(id: number) {
    this.dbops = DBOperation.delete;
    this.pagosServices.delete(id).subscribe(() => {
      // this.dialogRef.close("success");
      this._snack.openSnackBar("Pago Eliminado", 'Success');
      this.LoadPagos();
    }, error => {
      this._snack.openSnackBar(error, 'Error');
      //  this.dialogRef.close("error");

    });
  }

  gridaction(gridaction: any): void {

    switch (gridaction.action) {
      case DBOperation.create:
        this.addPago();
        break;
      case DBOperation.update:
        this.EditPago(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.deletePago(gridaction.values[0].value);
        break;
    }

  }
}
