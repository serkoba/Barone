import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ClientsModel } from '../../../modules/shared/models/clients.model';
import { SelectItem } from '../../models/select-item';
import { isUndefined } from 'util';
import { isNull } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit {

  @Input() public data: SelectItem[];
  @Input() public DisplayLabel: string;
  //@Input() public cliente: ClientsModel;
  @Output() public itemSelected = new EventEmitter<number>();
  public clienteCtrl = new FormControl();
  @Input() public SelectedItem: SelectItem;
  public filteredItems: Observable<SelectItem[]>;
  constructor(private chgRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.chgRef.detach();
    this.init();
    this.chgRef.detectChanges();
    this.chgRef.reattach();
    setTimeout(() => { this.chgRef.detectChanges(); })
  }

  public init() {

    this.filteredItems = this.clienteCtrl.valueChanges
      .pipe(
        startWith(''),
        map(item => item ? this._filterStates(item) : this.data.slice())
      );
  }

  public _filterStates(value: any): SelectItem[] {
    const filterValue = ((value instanceof Object) ? value.viewValue : value).toLowerCase();

    return this.data.filter(item => (item.viewValue ? item.viewValue : '').toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(item: SelectItem): string {
    //console.log(this.cliente);
    if (item == null && isUndefined(this.SelectedItem))
      return '';
    return item ? item.viewValue : this.SelectedItem.viewValue;
  }

  setCliente(itemSelected: SelectItem) {
    if (itemSelected instanceof Object)
      this.itemSelected.emit(itemSelected.value);

    //this.pago.IdCliente=clienteSelected.IdCliente.toString();
  }

}
