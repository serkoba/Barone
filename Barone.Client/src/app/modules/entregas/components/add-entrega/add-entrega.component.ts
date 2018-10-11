import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EstilosModel } from '../../../shared/models/estilos.model';
import { EstilosService } from '../../../estilos/services/estilos.service';

@Component({
  selector: 'app-add-entrega',
  templateUrl: './add-entrega.component.html',
  styleUrls: ['./add-entrega.component.scss']
})
export class AddEntregaComponent implements OnInit {
  estilosCtrl = new FormControl();

  @Output() public DialogSaved: EventEmitter<{ Cantidad: Number, Estilo: EstilosModel }>;
  estilos: EstilosModel[];
  estilo: EstilosModel;
  Cantidad: Number;
  filteredEstilos: Observable<EstilosModel[]>;
  constructor(private estilosServices: EstilosService, public dialogRef: MatDialogRef<AddEntregaComponent>) { }

  ngOnInit() {
    this.estilo = new EstilosModel();
    this.estilosServices.getAll().subscribe(estilos => {
      this.estilos = estilos;
      this.filteredEstilos = this.estilosCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.estilos.slice()));
    })
  }


  //   displayFn(estilo:EstilosModel): string {

  //       return estilo ? estilo.Nombre : this.estilo.Nombre;
  // }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.estilo = event.option.value;
    // this.fruitInput.nativeElement.value = '';
    // this.estilosCtrl.setValue(null);
    // this.reCalculateBarriles();

  }

  // setCliente(clienteSelected:ClientsModel){
  //   if (clienteSelected instanceof Object)
  //     this.itemSelected.emit(clienteSelected.IdCliente);
  //   //this.pago.IdCliente=clienteSelected.IdCliente.toString();
  // }
  private _filter(value: string): EstilosModel[] {
    const filterValue = value.toLowerCase();

    return this.estilos.filter(estilo => estilo.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }
  public submit() {
    this.dialogRef.close();
    // this.DialogSaved.emit({ Cantidad: this.Cantidad, Estilo: this.estilo });
  }

}
