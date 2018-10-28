import { Component, OnInit } from '@angular/core';
import { CuentasDebeHaberModel } from 'src/app/modules/shared/models/cuentas-debe-haber.model';
import { PedidoModel } from 'src/app/modules/shared/models/pedido.model';
import { ClientsModel } from 'src/app/modules/shared/models/clients.model';
import { PedidosService } from 'src/app/modules/pedidos/services/pedidos.service';
import { ClientsService } from 'src/app/modules/clients/services/clients.service';
import { PagosService } from 'src/app/modules/pagos/services/pagos.service';
import { PagosModel } from 'src/app/modules/shared/models/pagos.model';

@Component({
  selector: 'app-estado-cuenta-reporte',
  templateUrl: './estado-cuenta-reporte.component.html',
  styleUrls: ['./estado-cuenta-reporte.component.scss']
})
export class EstadoCuentaReporteComponent implements OnInit {

  columns: any[] = [
    {
      display: 'Fecha',
      variable: 'Fecha',
      filter: 'date',
      template: 'text'
    },
    {
      display: 'Descripcion',
      variable: 'Descripcion',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Debe',
      variable: 'DebeImporte',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Haber',
      variable: 'HaberImporte',
      filter: 'text',
      template: 'text'
    }
  ];

  cuenta: PagosModel;
  cuentas: CuentasDebeHaberModel[];
  clientes: ClientsModel[] = [];
  //  Cliente: ClientsModel;
  constructor(public pagosServices: PagosService, private clientesServices: ClientsService) { }

  ngOnInit() {
    this.cuenta = new PagosModel();
    this.cuenta.Cliente = new ClientsModel();

    this.clientesServices.getAll().subscribe(clientes => {
      this.clientes = clientes;


    });
    this.loadCuentas();
  }
  loadCuentas(): void {
    this.cuentas = [];
    this.pagosServices.FiltrarCuentas(this.cuenta)
      .subscribe(cuentas => {
        this.cuentas = cuentas;
      });

  }

  public itemSelected(idCliente: number) {
    // this.cliente.IdCliente = idCliente;
    this.cuenta.Cliente = this.clientes.find(x => x.IdCliente === idCliente);
  }



  public FiltrarInfo() {

    this.pagosServices.FiltrarCuentas(this.cuenta)
      .subscribe(cuentas => {
        this.cuentas = cuentas;
      });

  }



}
