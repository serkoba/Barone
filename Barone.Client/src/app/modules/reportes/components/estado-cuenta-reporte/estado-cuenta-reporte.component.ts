import { Component, OnInit } from '@angular/core';
import { CuentasDebeHaberModel } from 'src/app/modules/shared/models/cuentas-debe-haber.model';
import { PedidoModel } from 'src/app/modules/shared/models/pedido.model';
import { ClientsModel } from 'src/app/modules/shared/models/clients.model';
import { PedidosService } from 'src/app/modules/pedidos/services/pedidos.service';
import { ClientsService } from 'src/app/modules/clients/services/clients.service';
import { PagosService } from 'src/app/modules/pagos/services/pagos.service';
import { PagosModel } from 'src/app/modules/shared/models/pagos.model';
import { SelectItem } from 'src/app/core/models/select-item';
import { ReportFilterModel } from 'src/app/modules/shared/models/reporte-filtro.model';

@Component({
  selector: 'estado-cuenta-reporte',
  templateUrl: './estado-cuenta-reporte.component.html',
  styleUrls: ['./estado-cuenta-reporte.component.scss']
})
export class EstadoCuentaReporteComponent implements OnInit {

  columns: any[] = [
    {
      display: 'Fecha',
      variable: 'Fecha',
      filter: 'date',
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
      display: 'Debe',
      variable: 'DebeImporte',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Haber',
      variable: 'HaberImporte',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    }
  ];

  //cuenta: PagosModel;
  cuentas: CuentasDebeHaberModel[];
  //clientes: ClientsModel[] = [];
  //clientesItems: SelectItem[] = [];
  //SelectedItem: SelectItem;
  //  Cliente: ClientsModel;
  constructor(public pagosServices: PagosService) { }

  ngOnInit() {
    //this.cuenta = new PagosModel();
    //this.cuenta.Cliente = new ClientsModel();
    //this.SelectedItem = new SelectItem();
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
    this.loadCuentas();
  }
  loadCuentas(): void {
    this.cuentas = [];
    this.pagosServices.FiltrarCuentas(new ReportFilterModel())
      .subscribe(cuentas => {
        this.cuentas = cuentas;
      });

  }

  // public itemSelected(idCliente: number) {
  //   // this.cliente.IdCliente = idCliente;
  //   this.cuenta.Cliente = this.clientes.find(x => x.IdCliente === idCliente);
  // }



  public FiltrarInfo(model: ReportFilterModel) {

    this.pagosServices.FiltrarCuentas(model)
      .subscribe(cuentas => {
        this.cuentas = cuentas;
      });

  }



}
