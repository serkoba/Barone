import { Component, OnInit } from '@angular/core';
import { BarrilesService } from 'src/app/modules/barriles/services/barriles.service';
import { ClientsService } from 'src/app/modules/clients/services/clients.service';
import { ClientsModel } from 'src/app/modules/shared/models/clients.model';
import { EntregaModel } from 'src/app/modules/shared/models/entrega.model';
import { EntregasService } from 'src/app/modules/entregas/services/entregas.service';
import { SelectItem } from 'src/app/core/core.module.export';
import { ReportFilterModel } from 'src/app/modules/shared/models/reporte-filtro.model';

@Component({
  selector: 'app-entregas-reportes',
  templateUrl: './entregas-reportes.component.html',
  styleUrls: ['./entregas-reportes.component.scss']
})
export class EntregasReportesComponent implements OnInit {
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
      display: 'Fecha ',
      variable: 'fecha',
      filter: 'date',
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
      display: 'Cliente',
      variable: 'Cliente',
      filter: 'Cliente',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Nro de Remito',
      variable: 'idEntrega',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'Total',
      variable: 'TotalImporte',
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
  estilosSelect: SelectItem[] = [];
  entrega: ReportFilterModel;
  entregas: EntregaModel[];
  clientes: ClientsModel[] = [];
  clientesItems: SelectItem[] = [];
  SelectedItem: SelectItem;
  //  Cliente: ClientsModel;
  constructor(public entregaServices: EntregasService, private clientesServices: ClientsService) { }

  ngOnInit() {
    this.entrega = new ReportFilterModel();
    this.loadEntregas();
  }
  loadEntregas(): void {
    this.entregas = [];
    this.entregaServices.getAll()
      .subscribe(entregas => {
        this.entregas = entregas;
      });

  }



  public FiltrarInfo(model: ReportFilterModel) {

    this.entregaServices.filtrar(model)
      .subscribe(entregas => {
        this.entregas = entregas;
      });

  }



}
