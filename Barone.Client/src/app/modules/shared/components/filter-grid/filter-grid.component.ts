import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EstilosModel } from '../../models/estilos.model';
import { SelectItem } from '../../../../core/core.module.export';
import { BarrilModel } from '../../models/barril.model';
import { ClientsModel } from '../../models/clients.model';
import { ReportFilterModel } from '../../models/reporte-filtro.model';
import { EstilosService } from '../../../estilos/services/estilos.service';
import { ClientsService } from '../../../clients/services/clients.service';


@Component({
  selector: 'filter-grid',
  templateUrl: './filter-grid.component.html',
  styleUrls: ['./filter-grid.component.scss']
})
export class FilterGridComponent implements OnInit {
  @Input() public FilterBarril = false;
  @Input() public FilterPedEnt = false;
  @Output() public FilterClicked: EventEmitter<ReportFilterModel> = new EventEmitter<ReportFilterModel>();
  estilos: EstilosModel[] = [];
  estilosSelect: SelectItem[] = [];
  // barril: BarrilModel;
  barriles: BarrilModel[];
  clientes: ClientsModel[] = [];
  Cliente: ClientsModel;
  clientesItems: SelectItem[] = [];
  SelectedItem: SelectItem;
  ReportFilter: ReportFilterModel;
  public Estados: SelectItem[];
  public Estado: number;
  public Estilo: number;
  public FechaDesde: number;
  public FechaHasta: number;
  public NroBarril: string;
  EstadoBarril: SelectItem[] = [
    { value: 0, viewValue: 'Seleccione Categoria' },
    { value: 1, viewValue: 'Para Despacho' },
    { value: 2, viewValue: 'Entregadas' },
    { value: 3, viewValue: 'En Progreso' },
    { value: 4, viewValue: 'Reservado' }
  ];
  EstadoPedido: SelectItem[] = [
    { value: 0, viewValue: 'Seleccione Categoria' },
    { value: 1, viewValue: 'Pendiente' },
    { value: 2, viewValue: 'En Progreso' },
    { value: 3, viewValue: 'Entregado' }
  ];
  constructor(public estilosServices: EstilosService, private clientesServices: ClientsService) { }

  ngOnInit() {
    if (this.FilterBarril) {
      this.Estados = this.EstadoBarril;
      this.loadEstilos();
    }
    else {
      this.Estados = this.EstadoPedido;
    }
    this.Cliente = new ClientsModel();
    this.SelectedItem = new SelectItem();
    this.ReportFilter = new ReportFilterModel();
    this.initFiltro();

    this.clientesServices.getAll().subscribe(clientes => {
      this.clientes = clientes;
      this.clientesItems = clientes.map(cliente => {
        return new SelectItem({
          smallValue: `CUIT: ${cliente.CUIT}`,
          viewValue: cliente.RazonSocial,
          value: cliente.IdCliente
        })
      })


    });

  }

  public initFiltro() {
    this.ReportFilter.Estilo = 0;
    this.ReportFilter.Estado = 0;
    this.ReportFilter.NroBarril = '';
    this.ReportFilter.RazonSocial = null;
    this.ReportFilter.FechaDesde = null;
    this.ReportFilter.FechaHasta = null;
    this.SelectedItem = new SelectItem();
    this.Cliente = new ClientsModel();
  }

  public clientSelected(idCliente: number) {
    this.Cliente = this.clientes.find(x => x.IdCliente === idCliente);
  }
  public loadEstilos() {
    this.estilosServices.getAll().subscribe(estilos => {
      this.estilos = estilos;
      this.estilosSelect = estilos.map(estilo => { return new SelectItem({ value: estilo.IdEstilo, viewValue: estilo.Nombre }) });
    })
  }
  // public changeEstiloBarrilSelect(idEstilo: number) {
  //   this.Estilo = idEstilo;
  // }

  public FiltrarInfo() {
    //   this.ReportFilter.NroBarril = this.NroBarril;
    this.ReportFilter.RazonSocial = this.Cliente == undefined ? null : this.Cliente.RazonSocial;
    // this.ReportFilter.Estilo = this.Estilo;
    // this.ReportFilter.Estado = this.Estado;
    // this.ReportFilter.FechaDesde = this.FechaDesde;
    // this.ReportFilter.FechaHasta = this.FechaHasta;
    this.FilterClicked.emit(this.ReportFilter);

  }

}
