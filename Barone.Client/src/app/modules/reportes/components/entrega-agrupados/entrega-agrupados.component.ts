import { Component, OnInit } from '@angular/core';
import { EntregasAgrupadasModel } from 'src/app/modules/shared/models/entregas-agrupadas.model';
import { ClientsModel } from 'src/app/modules/shared/models/clients.model';
import { PedidosService } from 'src/app/modules/pedidos/services/pedidos.service';
import { PedidoModel } from 'src/app/modules/shared/models/pedido.model';
import { ClientsService } from 'src/app/modules/clients/services/clients.service';
import { SelectItem } from 'src/app/core/core.module.export';
import { ReportFilterModel } from 'src/app/modules/shared/models/reporte-filtro.model';



@Component({
  selector: 'entrega-agrupados',
  templateUrl: './entrega-agrupados.component.html',
  styleUrls: ['./entrega-agrupados.component.scss']
})
export class EntregaAgrupadosComponent implements OnInit {
  // Estados: SelectItem[] = [
  //   { value: 0, viewValue: 'Seleccione Categoria' },
  //   { value: 1, viewValue: 'Entregadas' },
  //   { value: 2, viewValue: 'En Progreso' },
  //   { value: 3, viewValue: 'Entregado' }
  // ];
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
    }
  ];

  pedido: ReportFilterModel;
  pedidos: EntregasAgrupadasModel[];
  // clientes: ClientsModel[] = [];
  // clientesItems: SelectItem[] = [];
  // SelectedItem: SelectItem;
  constructor(public pedidoServices: PedidosService) { }

  ngOnInit() {
    this.pedido = new ReportFilterModel();
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
    this.pedidoServices.GroupByClient(this.pedido)
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      });

  }

  //   public itemSelected(idCliente: number) {
  //     // this.cliente.IdCliente = idCliente;
  //  //   this.pedido.Cliente = this.clientes.find(x => x.IdCliente === idCliente);
  //   }



  // public FiltrarInfo() {

  //   this.pedidoServices.GroupByClient(this.pedido)
  //     .subscribe(pedidos => {
  //       this.pedidos = pedidos;
  //     });

  // }

  public FiltrarInfo(ReportFilter: ReportFilterModel) {
    //  ReportFilter.BarrilFilter = this.barril;
    //  ReportFilter.ClientFilter = this.Cliente;
    this.pedidoServices.GroupByClient(ReportFilter)
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      });

  }



}
