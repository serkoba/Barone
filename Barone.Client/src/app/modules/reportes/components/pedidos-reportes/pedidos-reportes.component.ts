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

  columns: any[] = [
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
    }
  ];
  sorting: any = {
    column: 'fechaPactada',
    descending: false
  };
  pedidos: PedidoModel[];
  constructor(public pedidoServices: PedidosService, private clientesServices: ClientsService) { }

  ngOnInit() {
   
    this.loadPedidos();
  }
  loadPedidos(): void {
    this.pedidos = [];
    this.pedidoServices.getAll()
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      });

  }



  public FiltrarInfo(model: ReportFilterModel) {

    this.pedidoServices.filtrar(model)
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      });

  }



}
