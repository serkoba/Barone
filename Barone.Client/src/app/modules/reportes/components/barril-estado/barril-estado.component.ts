import { Component, OnInit } from '@angular/core';
import { SelectItem } from '../../../shared/models/select-item';
import { BarrilesService } from '../../../barriles/services/barriles.service';
import { EstilosService } from '../../../estilos/services/estilos.service';
import { EstilosModel } from '../../../shared/models/estilos.model';
import { BarrilModel } from '../../../shared/models/barril.model';
import { ClientsModel } from '../../../shared/models/clients.model';
import { ClientsService } from '../../../clients/services/clients.service';

@Component({
  selector: 'app-barril-estado',
  templateUrl: './barril-estado.component.html',
  styleUrls: ['./barril-estado.component.scss']
})
export class BarrilEstadoReporteComponent implements OnInit {
  Estados: SelectItem[] = [
    { value: 0, viewValue: 'Seleccione Categoria' },
    { value: 1, viewValue: 'Para Despacho' },
    { value: 2, viewValue: 'Entregadas' },
    { value: 3, viewValue: 'En Progreso' },
    { value: 4, viewValue: 'Reservado' }
  ];
  estilos: EstilosModel[] = [];
  estilosSelect: SelectItem[] = [];
  barril: BarrilModel;

  clientes: ClientsModel[] = [];
  Cliente: ClientsModel;
  constructor(public barrilServices: BarrilesService, public estilosServices: EstilosService, private clientesServices: ClientsService) { }

  ngOnInit() {
    this.barril = new BarrilModel();
    this.Cliente = new ClientsModel();
    this.loadEstilos();

    this.clientesServices.getAll().subscribe(clientes => {
      this.clientes = clientes;


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

  }



}
