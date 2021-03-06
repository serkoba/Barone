import { Component, OnInit } from '@angular/core';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { PedidoModel } from '../../../shared/models/pedido.model';
import { PedidosPipe } from '../../../shared/filters/pedidos.pipe';
import { MatDialog } from '@angular/material';
import { ButtonType } from '../../../shared/enum/enums';
import { EditPedidosComponent } from '../edit-pedidos/edit-pedidos.component';
import { PedidosService } from '../../services/pedidos.service';
import { SnackManagerService } from '../../../../core/core.module.export';
import { EditEntregasComponent } from '../../../entregas/components/edit-entregas/edit-entregas.component';
import { ReportFilterModel } from 'src/app/modules/shared/models/reporte-filtro.model';

@Component({
  selector: 'adminpedidos',
  templateUrl: './adminpedidos.component.html',
  styleUrls: ['./adminpedidos.component.scss']
})



export class AdminpedidosComponent implements OnInit {
  pedidos: PedidoModel[];
  isREADONLY: boolean = false;
  exportFileName: string = "clients_";
  dbops: DBOperation;
  msg: string;
  modalTitle: string;
  modalBtnTitle: string;
  pedido: PedidoModel;
  //Grid Vars start
  columns: any[] = [
    {
      display: 'Nro Pedido',
      variable: 'id',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Fecha Pactada',
      variable: 'fechaPactada',
      filter: 'date',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Fecha Pedido',
      variable: 'fechaPedido',
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
      display: 'Detalle',
      variable: 'DetallePedido',
      filter: 'detallePedido',
      template: 'detallePedido',
      Sumarizable:false
    },
    {
      display: 'Total Barriles',
      variable: 'TotalBarriles',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Estado',
      variable: 'Estado',
      filter: 'Estado',
      template: 'estado',
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
    column: 'fechaPactada',
    descending: false
  };
  hdrbtns: any[] = [];
  gridbtns: any[] = [];
  initGridButton() {

    this.hdrbtns = [
      {
        title: 'Nuevo Pedido',
        keys: [''],
        action: DBOperation.create,
        ishide: this.isREADONLY

      }//,
      // {
      //   title: 'Asignar entrega a pedidos',
      //   keys: [''],
      //   action: DBOperation.AsignarEntregaAPedido,
      //   ishide: this.isREADONLY

      // }
    ];
    this.gridbtns = [
      {
        title: 'Editar',
        icon: 'create',
        keys: ['id'],
        action: DBOperation.update,
        ishide: this.isREADONLY
      },
      {
        title: 'Borrar',
        icon: 'clear',
        keys: ["id"],
        action: DBOperation.delete,
        ishide: this.isREADONLY
      },
      {
        title: 'Iniciar Entrega',
        icon: 'add_shopping_cart',
        keys: ['id'],
        action: DBOperation.AsignarEntregaAPedido,
        ishide: this.isREADONLY

      }

    ];
  }

  constructor(private _snack: SnackManagerService,
    private pedidosServices: PedidosService, public pedidosFilter: PedidosPipe, private dialog: MatDialog) { }
  public openDialog(type: string) {
    let dialogRef = null;
    switch (type) {
      case ButtonType.Pedidos:
        dialogRef = this.dialog.open(EditPedidosComponent);
        break;
      case ButtonType.AsignarEntregaAPedidos:

        dialogRef = this.dialog.open(EditEntregasComponent);
        dialogRef.componentInstance.enabled = true;
        break;
      default:
        break;
    }

    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.pedido = this.pedido;

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.loadPedidos();
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
          case DBOperation.AsignarEntregaAPedido:
            this.msg = "Pedidos Actualizados"
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
    this.loadPedidos();

  }
  loadPedidos(): void {
    this.pedidos = [];
    this.pedidosServices.getAll()
      .subscribe(pedidos => {
        this.pedidos = pedidos;
        this.initGridButton();
      });
  }
  
  public FiltrarInfo(model: ReportFilterModel) {

    this.pedidosServices.filtrar(model)
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      });

  }

  addPedido() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Agrega Nuevo Pedido";
    this.modalBtnTitle = "Guardar";
    this.openDialog(ButtonType.Pedidos);
  }
  EditPedido(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Edit Barril";
    this.modalBtnTitle = "Update";
    this.pedido = this.pedidos.find(x => x.id === id);
    //   this.userServices.getById(id).then(val => { this.user = Object.assign(new User(), val); this.openDialog(); });;
    this.openDialog(ButtonType.Pedidos);
  }
  DeletePedido(id: number) {
    this.dbops = DBOperation.delete;
    this.pedidosServices.delete(id).subscribe(() => {
      // this.dialogRef.close("success");
      this._snack.openSnackBar("Pago Eliminado", 'Success');
      this.loadPedidos();
    }, error => {
      this._snack.openSnackBar(error, 'Error');
      //  this.dialogRef.close("error");

    });
  }
  public AsignarEntregaAPedido(id: number) {
    this.dbops = DBOperation.create;
    this.modalTitle = "Asignar Entrega a Pedido";
    this.modalBtnTitle = "Guardar";
    this.pedido = this.pedidos.find(x => x.id === id);
    this.openDialog(ButtonType.AsignarEntregaAPedidos);
  }



  gridaction(gridaction: any): void {

    switch (gridaction.action) {
      case DBOperation.create:
        this.addPedido();
        break;
      case DBOperation.update:
        this.EditPedido(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.DeletePedido(gridaction.values[0].value);
        break;
      case DBOperation.AsignarEntregaAPedido:
        this.AsignarEntregaAPedido(gridaction.values[0].value);
        break;

    }

  }
}

