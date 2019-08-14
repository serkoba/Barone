import { Component, OnInit } from '@angular/core';
import { EntregasService } from 'src/app/modules/entregas/services/entregas.service';
import { ReportFilterModel } from 'src/app/modules/shared/models/reporte-filtro.model';
import { DetalleEntregas } from 'src/app/modules/shared/models/entregas-agrupadas.model';

@Component({
  selector: 'app-entregas-x-cliente',
  templateUrl: './entregas-x-cliente.component.html',
  styleUrls: ['./entregas-x-cliente.component.scss']
})
export class EntregasXClienteComponent implements OnInit {
  gridbtns: any[] = [];
  hdrbtns: any[] = [];
  entrega: ReportFilterModel;
  entregas: DetalleEntregas[];
  columns: any[] = [
    {
      display: 'Cliente',
      variable: 'Estilo',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Total Litros',
      variable: 'CantidadLitros',
      filter: 'text',
      template: 'text',
      Sumarizable:true
    }
    ,
    {
      display: 'Total Barriles',
      variable: 'CantidadBarriles',
      filter: 'text',
      template: 'text',
      Sumarizable:true
    }]
  constructor(public entregasServices:EntregasService) { }
  ngOnInit() {
    this.entrega = new ReportFilterModel();
    this.entrega.Estado=0;
    this.loadEntregas();
  }

  public loadEntregas(): void {
    this.entregas = [];
    this.entregasServices.MovimientosByCliente(this.entrega)
      .subscribe(entregas => {
        this.entregas = entregas;
      });

  }

  
  public FiltrarInfo(ReportFilter: ReportFilterModel) {
    this.entregasServices.MovimientosByCliente(ReportFilter)
      .subscribe(entregas => {
        this.entregas = entregas;
      });

  }

}
