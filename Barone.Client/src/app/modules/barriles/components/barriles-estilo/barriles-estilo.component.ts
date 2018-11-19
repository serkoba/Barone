import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { SelectItem } from 'src/app/core/core.module.export';

@Component({
  selector: 'barriles-estilo',
  templateUrl: './barriles-estilo.component.html',
  styleUrls: ['./barriles-estilo.component.scss']
})
export class BarrilesEstiloComponent implements OnInit {


  // Estilos: SelectItem[] = [
  //   { value: 0, viewValue: 'Seleccione Categoria' },
  //   { value: 1, viewValue: 'IPA' },
  //   { value: 2, viewValue: 'Honey' },
  //   { value: 3, viewValue: 'Banana' },
  //   { value: 4, viewValue: 'Winer' }
  // ];
  // msg: string;
  // indLoading: boolean = false;
  // modalTitle: string;
  // modalBtnTitle: string;
  // listFilter: string;
  // selectedOption: string;
  // barriles: string;


  // visible = true;
  // selectable = true;
  // removable = true;
  // addOnBlur = false;
  // separatorKeysCodes: number[] = [ENTER, COMMA];
  // fruitCtrl = new FormControl();
  // filteredFruits: Observable<string[]>;
  // fruits: string[] = ['Lemon'];
  // allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  // @ViewChild('fruitInput') fruitInput: ElementRef;

  // constructor(public dialogRef: MatDialogRef<BarrilesEstiloComponent>) {
  //   this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
  //     startWith(null),
  //     map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  // }

  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;

  //   // Add our fruit
  //   if ((value || '').trim()) {
  //     this.fruits.push(value.trim());
  //   }

  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }

  //   this.fruitCtrl.setValue(null);
  // }

  // remove(fruit: string): void {
  //   const index = this.fruits.indexOf(fruit);

  //   if (index >= 0) {
  //     this.fruits.splice(index, 1);
  //   }
  // }

  // selected(event: MatAutocompleteSelectedEvent): void {
  //   this.fruits.push(event.option.viewValue);
  //   this.fruitInput.nativeElement.value = '';
  //   this.fruitCtrl.setValue(null);
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  // }

  ngOnInit() {
  }

  // onSubmit() {

  // }

}
