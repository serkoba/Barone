import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ClientsModel } from '../../../modules/shared/models/clients.model';



@Component({
  selector: 'autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit {

  @Input() public data: ClientsModel[];
  @Input() public cliente: ClientsModel;
  @Output() public itemSelected = new EventEmitter<number>();
  public clienteCtrl = new FormControl();

  public filteredClientes: Observable<ClientsModel[]>;
  constructor(private chgRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.chgRef.detach();
    this.init();
    this.chgRef.detectChanges();
    this.chgRef.reattach();
  }

  public init() {

    this.filteredClientes = this.clienteCtrl.valueChanges
      .pipe(
        startWith(''),
        map(cliente => cliente ? this._filterStates(cliente) : this.data.slice())
      );
  }

  public _filterStates(value: any): ClientsModel[] {
    const filterValue = ((value instanceof Object) ? value.RazonSocial : value).toLowerCase();

    return this.data.filter(cliente => (cliente.RazonSocial ? cliente.RazonSocial : '').toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(cliente: ClientsModel): string {
    console.log(this.cliente);
    return cliente ? cliente.RazonSocial : this.cliente.RazonSocial;
  }

  setCliente(clienteSelected: ClientsModel) {
    if (clienteSelected instanceof Object)
      this.itemSelected.emit(clienteSelected.IdCliente);

    //this.pago.IdCliente=clienteSelected.IdCliente.toString();
  }

}
