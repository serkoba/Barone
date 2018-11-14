import { Component, OnInit } from '@angular/core';
import { BarrilesService } from '../../../barriles/services/barriles.service';
import { EstilosService } from '../../../estilos/services/estilos.service';
import { EstilosModel } from '../../../shared/models/estilos.model';
import { BarrilModel } from '../../../shared/models/barril.model';
import { ClientsModel } from '../../../shared/models/clients.model';
import { ClientsService } from '../../../clients/services/clients.service';
import { SelectItem } from 'src/app/core/core.module.export';

@Component({
  selector: 'app-barril-estado',
  templateUrl: './barril-estado.component.html',
  styleUrls: ['./barril-estado.component.scss']
})
export class BarrilEstadoReporteComponent implements OnInit {
  gridbtns: any[] = [];
  hdrbtns: any[] = [];
  Estados: SelectItem[] = [
    { value: 0, viewValue: 'Seleccione Categoria' },
    { value: 1, viewValue: 'Para Despacho' },
    { value: 2, viewValue: 'Entregadas' },
    { value: 3, viewValue: 'En Progreso' },
    { value: 4, viewValue: 'Reservado' }
  ];
  columns: any[] = [
    {
      display: 'Nro de Barril',
      variable: 'NroBarril',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Estado',
      variable: 'idEstado',
      filter: 'estadobarril',
      template: 'text'
    },
    {
      display: 'Estilo',
      variable: 'Estilo',
      filter: 'estilo',
      template: 'text'
    },
    {
      display: 'Cant. Litros',
      variable: 'CantidadLitros',
      filter: 'text',
      template: 'text'
    }

  ];
  estilos: EstilosModel[] = [];
  estilosSelect: SelectItem[] = [];
  barril: BarrilModel;
  barriles: BarrilModel[];
  clientes: ClientsModel[] = [];
  Cliente: ClientsModel;
  clientesItems: SelectItem[] = [];
  SelectedItem: SelectItem;
  constructor(public barrilServices: BarrilesService, public estilosServices: EstilosService, private clientesServices: ClientsService) { }

  ngOnInit() {
    this.barril = new BarrilModel();
    this.Cliente = new ClientsModel();
    this.SelectedItem = new SelectItem();
    this.loadEstilos();

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

    this.loadBarriles();
  }
  loadBarriles(): void {
    this.barriles = [];
    this.barrilServices.getAll()
      .subscribe(barriles => {
        this.barriles = barriles;
      });

  }

  public itemSelected(idCliente: number) {
    // this.cliente.IdCliente = idCliente;
    this.Cliente = this.clientes.find(x => x.IdCliente === idCliente);
  }
  public loadEstilos() {
    this.estilosServices.getAll().subscribe(estilos => {
      this.estilos = estilos;
      this.estilosSelect = estilos.map(estilo => { return new SelectItem({ value: estilo.IdEstilo, viewValue: estilo.Nombre }) });
    })
  }
  public changeSelect(idEstilo: Number) {
    this.barril.Estilo = this.estilos.find(x => x.IdEstilo === idEstilo);
  }

  public FiltrarInfo() {

    this.barrilServices.filtrar(this.barril)
      .subscribe(barriles => {
        this.barriles = barriles;
      });

  }



}
