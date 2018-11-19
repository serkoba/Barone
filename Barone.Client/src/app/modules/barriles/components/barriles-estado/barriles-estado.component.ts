import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { map, startWith, mergeMap } from 'rxjs/operators';

import { SnackManagerService, SelectItem } from '../../../../core/core.module.export';
import { EstilosModel } from '../../../shared/models/estilos.model';
import { EstilosService } from '../../../estilos/services/estilos.service';
import { BarrilesService } from '../../services/barriles.service';
import { BarrilModel } from '../../../shared/models/barril.model';

@Component({
  selector: 'app-barriles-estado',
  templateUrl: './barriles-estado.component.html',
  styleUrls: ['./barriles-estado.component.scss']
})
export class BarrilesEstadoComponent implements OnInit {


  Estados: SelectItem[] = [
    { value: 0, viewValue: 'Seleccione Categoria' },
    { value: 1, viewValue: 'Para Despacho' },
    { value: 2, viewValue: 'Entregadas' },
    { value: 3, viewValue: 'En Progreso' },
    { value: 4, viewValue: 'Reservado' }
  ];
  estilos: EstilosModel[] = [];
  estilosSelect: SelectItem[] = [];
  msg: string;
  indLoading: boolean = false;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  // barriles: string;


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  barrilCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  barriles: string[] = [];
  IdEstilo: number;
  idEstado: number;
  // allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  public TodosLosBarriles: boolean;
  @ViewChild('fruitInput') fruitInput: ElementRef;

  constructor(public _snack: SnackManagerService, public estilosServices: EstilosService,
    private barrilServices: BarrilesService,
    public dialogRef: MatDialogRef<BarrilesEstadoComponent>) {

    // this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    //     startWith(null),
    //     map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.barriles.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.barrilCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.barriles.indexOf(fruit);

    if (index >= 0) {
      this.barriles.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.barriles.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.barrilCtrl.setValue(null);
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  // }

  ngOnInit() {
    this.TodosLosBarriles = false;
    this.loadEstilos();
  }
  public loadEstilos() {
    this.estilosServices.getAll().subscribe(estilos => {
      this.estilos = estilos;
      this.estilosSelect = estilos.map(estilo => { return new SelectItem({ value: estilo.IdEstilo, viewValue: estilo.Nombre }) });
    })
  }
  private updateAllBarriles(): Observable<void> {
    return this.barrilServices.updateAll(new BarrilModel({ idEstado: this.idEstado, IdEstilo: this.IdEstilo }));
  }
  private updatePartial(): Observable<void> {
    return from(this.barriles).pipe(
      mergeMap(barril => {
        const barrilModel = new BarrilModel({ NroBarril: barril, idEstado: this.idEstado, IdEstilo: this.IdEstilo });
        return this.barrilServices.updatePartial(barrilModel);
      }))
  }
  onSubmit() {
    const functionToCall = this.TodosLosBarriles ? this.updateAllBarriles() : this.updatePartial();
    functionToCall
      .subscribe(() => {
        this.dialogRef.close("success");
        this._snack.openSnackBar("Barriles Actualizado", 'Success');
      }, error => {
        this._snack.openSnackBar(error, 'Error');
        this.dialogRef.close("error");

      });


    //     let count=0;
    //     this.barriles.forEach(barril =>{
    // const barrilModel = new BarrilModel({NroBarril:barril,idEstado:this.idEstado,IdEstilo:this.IdEstilo});
    // this.barrilServices.updatePartial(barrilModel).subscribe(()=>{
    //   this._snack.openSnackBar(barril + " Actualizado",'Success');
    // },error =>{
    //   this._snack.openSnackBar(error,'Error');
    //    this.dialogRef.close("error");

    //  });
    //     })

  }

}
