import { Component, OnInit } from '@angular/core';
import { EntregaModel } from '../../../shared/models/entrega.model';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { MatDialog } from '@angular/material';
import { EditEntregasComponent } from '../edit-entregas/edit-entregas.component';
import { EntregasService } from '../../services/entregas.service';
import { EntregasPipe } from '../../../shared/filters/entregas.pipe';
import { SnackManagerService } from '../../../../core/core.module.export';
import { ReportFilterModel } from 'src/app/modules/shared/models/reporte-filtro.model';

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
  enabled: boolean;
  //Grid Vars start
  columns: any[] = [
    {
      display: 'Fecha ',
      variable: 'fecha',
      filter: 'date',
      template: 'text'
    },
    {
      display: 'Fecha Pactada',
      variable: 'fechaPactada',
      filter: 'date',
      template: 'text'
    },
    {
      display: 'Cliente',
      variable: 'Cliente',
      filter: 'Cliente',
      template: 'text'
    },
    {
      display: 'Nro de Remito',
      variable: 'idEntrega',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Total',
      variable: 'TotalImporte',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Estado',
      variable: 'Estado',
      filter: 'Estado',
      template: 'estado'
    },
    {
      display: 'Acciones',
      variable: 'acciones',
      filter: 'text',
      template: 'acciones'
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
      },
      {
        title: 'Ver',
        icon: 'search',
        keys: ["idEntrega"],
        action: DBOperation.ver,
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
    dialogRef.componentInstance.enabled = this.enabled != undefined ? this.enabled : true;
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
  

  public FiltrarInfo(model: ReportFilterModel) {

    this.entregaServices.filtrar(model)
      .subscribe(entregas => {
        this.entregas = entregas;
      });

  }
  loadEntregas(): void {
    this.entregas = [];

    this.entregaServices.getAll()
      .subscribe(entregas => {
        this.entregas = entregas;
        this.initGridButton();
      });


  }

  addEntrega() {
    this.dbops = DBOperation.create;
    this.enabled = true;
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
    this.openDialog();
    
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
        this.enabled = true;
        this.EditEntrega(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.DeleteEntrega(gridaction.values[0].value);
        break;
      case DBOperation.ver:
        this.enabled = false;
        this.EditEntrega(gridaction.values[0].value);

    }

  }
}

