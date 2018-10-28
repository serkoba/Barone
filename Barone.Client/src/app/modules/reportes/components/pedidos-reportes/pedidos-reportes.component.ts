import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'src/app/modules/shared/models/select-item';
import { PedidosService } from 'src/app/modules/pedidos/services/pedidos.service';
import { ClientsService } from 'src/app/modules/clients/services/clients.service';
import { ClientsModel } from 'src/app/modules/shared/models/clients.model';
import { PedidoModel } from 'src/app/modules/shared/models/pedido.model';

@Component({
  selector: 'app-pedidos-reportes',
  templateUrl: './pedidos-reportes.component.html',
  styleUrls: ['./pedidos-reportes.component.scss']
})
export class PedidosReportesComponent implements OnInit {
  gridbtns: any[] = [];
  hdrbtns: any[] = [];
  Estados: SelectItem[] = [
    { value: 0, viewValue: 'Seleccione Categoria' },
    { value: 1, viewValue: 'Entregadas' },
    { value: 2, viewValue: 'En Progreso' },
    { value: 3, viewValue: 'Entregado' }
  ];

  columns: any[] = [
    {
      display: 'Fecha Pactada',
      variable: 'fechaPactada',
      filter: 'date',
      template: 'text'
    },
    {
      display: 'Fecha Pedido',
      variable: 'fechaPedido',
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
      display: 'Detalle',
      variable: 'DetallePedido',
      filter: 'detallePedido',
      template: 'detallePedido'
    },
    {
      display: 'Total Barriles',
      variable: 'TotalBarriles',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Estado',
      variable: 'Estado',
      filter: 'Estado',
      template: 'estado'
    }
  ];
  sorting: any = {
    column: 'fechaPactada',
    descending: false
  };
  estilosSelect: SelectItem[] = [];
  pedido: PedidoModel;
  pedidos: PedidoModel[];
  clientes: ClientsModel[] = [];
  //  Cliente: ClientsModel;
  constructor(public pedidoServices: PedidosService, private clientesServices: ClientsService) { }

  ngOnInit() {
    this.pedido = new PedidoModel();
    this.pedido.Cliente = new ClientsModel();

    this.clientesServices.getAll().subscribe(clientes => {
      this.clientes = clientes;


    });
    this.loadPedidos();
  }
  loadPedidos(): void {
    this.pedidos = [];
    this.pedidoServices.getAll()
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      });

  }

  public itemSelected(idCliente: number) {
    // this.cliente.IdCliente = idCliente;
    this.pedido.Cliente = this.clientes.find(x => x.IdCliente === idCliente);
  }



  public FiltrarInfo() {

    this.pedidoServices.filtrar(this.pedido)
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      });

  }



}
