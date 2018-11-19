import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/modules/pedidos/services/pedidos.service';
import { ClientsService } from 'src/app/modules/clients/services/clients.service';
import { ClientsModel } from 'src/app/modules/shared/models/clients.model';
import { PedidoModel } from 'src/app/modules/shared/models/pedido.model';
import { SelectItem } from 'src/app/core/core.module.export';
import { ReportFilterModel } from 'src/app/modules/shared/models/reporte-filtro.model';

@Component({
  selector: 'app-pedidos-reportes',
  templateUrl: './pedidos-reportes.component.html',
  styleUrls: ['./pedidos-reportes.component.scss']
})
export class PedidosReportesComponent implements OnInit {
  gridbtns: any[] = [];
  hdrbtns: any[] = [];
  // Estados: SelectItem[] = [
  //   { value: 0, viewValue: 'Seleccione Categoria' },
  //   { value: 1, viewValue: 'Entregadas' },
  //   { value: 2, viewValue: 'En Progreso' },
  //   { value: 3, viewValue: 'Entregado' }
  // ];

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
  // estilosSelect: SelectItem[] = [];
  //pedido: PedidoModel;
  pedidos: PedidoModel[];
  //clientes: ClientsModel[] = [];
  //clientesItems: SelectItem[] = [];
  //SelectedItem: SelectItem;
  constructor(public pedidoServices: PedidosService, private clientesServices: ClientsService) { }

  ngOnInit() {
    // this.pedido = new ReportFilterModel();
    //  this.pedido.Cliente = new ClientsModel();
    // this.SelectedItem = new SelectItem();
    // this.clientesServices.getAll().subscribe(clientes => {
    //   this.clientes = clientes;
    //   this.clientesItems = clientes.map(cliente => {
    //     return new SelectItem({
    //       smallValue: `CUIT: ${cliente.CUIT}`,
    //       viewValue: cliente.RazonSocial,
    //       value: cliente.IdCliente
    //     })
    //   })

    // });
    this.loadPedidos();
  }
  loadPedidos(): void {
    this.pedidos = [];
    this.pedidoServices.getAll()
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      });

  }

  // public itemSelected(idCliente: number) {
  //   // this.cliente.IdCliente = idCliente;
  //   this.pedido.Cliente = this.clientes.find(x => x.IdCliente === idCliente);
  // }



  public FiltrarInfo(model: ReportFilterModel) {

    this.pedidoServices.filtrar(model)
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      });

  }



}
