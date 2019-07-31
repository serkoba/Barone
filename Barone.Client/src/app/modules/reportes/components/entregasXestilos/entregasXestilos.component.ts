import { Component, OnInit } from '@angular/core';
import { ReportFilterModel } from 'src/app/modules/shared/models/reporte-filtro.model';
import { EntregasService } from 'src/app/modules/entregas/services/entregas.service';
import { ClientsService } from 'src/app/modules/clients/services/clients.service';
import { EntregasAgrupadasByClienteModel, DetalleEntregas } from 'src/app/modules/shared/models/entregas-agrupadas.model';

@Component({
  selector: 'app-entregasXEstilos',
  templateUrl: './entregasXestilos.component.html',
  styleUrls: ['./entregasXestilos.component.scss']
})
export class EntregasXEstilosComponent implements OnInit {
  // Estados: SelectItem[] = [
  //   { value: 0, viewValue: 'Seleccione Categoria' },
  //   { value: 1, viewValue: 'Entregadas' },
  //   { value: 2, viewValue: 'En Progreso' },
  //   { value: 3, viewValue: 'Entregado' }
  // ];
  columns: any[] = [
    {
      display: 'Estilo ',
      variable: 'Estilo',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Cantidad Litros',
      variable: 'CantidadLitros',
      filter: 'text',
      template: 'text',
      Sumarizable:true
    },
    {
      display: 'Cantidad Barriles',
      variable: 'CantidadBarriles',
      filter: 'text',
      template: 'text',
      Sumarizable:true
    }
  ];

  entrega: ReportFilterModel;
  entregas: DetalleEntregas[];
  // clientes: ClientsModel[] = [];
  // clientesItems: SelectItem[] = [];
  // SelectedItem: SelectItem;
  constructor(public entregasServices: EntregasService) { }

  ngOnInit() {
    this.entrega = new ReportFilterModel();
    this.entrega.Estado=0;
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
    this.entregas = [];
    this.entregasServices.MovimientosXEstilos(this.entrega)
      .subscribe(entregas => {
        this.entregas = entregas;
      });

  }


  public FiltrarInfo(ReportFilter: ReportFilterModel) {
    this.entregasServices.MovimientosXEstilos(ReportFilter)
      .subscribe(entregas => {
        this.entregas = entregas;
      });

  }



}
