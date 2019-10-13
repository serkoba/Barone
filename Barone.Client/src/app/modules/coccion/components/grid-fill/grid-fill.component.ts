import { Component, OnInit, Input, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { InsumoModel } from 'src/app/modules/shared/models/insumo.model';
import { InsumosService } from 'src/app/modules/insumos/services/insumos.service';

@Component({
  selector: 'grid-fill',
  templateUrl: './grid-fill.component.html',
  styleUrls: ['./grid-fill.component.scss']
})
export class gridFillComponent implements OnInit {
  @Input() columnsToDisplay: any[] = [];
  @Input() data: any[];
  @Input() public Title: string;
  @ViewChild('text') public text: TemplateRef<ElementRef>;
  ///Form Data
  public displayedColumns: string[];
  public insumos: InsumoModel[];
  dataSource = new MatTableDataSource<any[]>();
  public dataForm: FormGroup;
  get dataArray() {
    return this.dataForm.get('dataArray') as FormArray;
  }
  constructor(public _formBuilder: FormBuilder, private insumosServices: InsumosService) { }

  ngOnInit() {
    this.displayedColumns = this.columnsToDisplay.map(column => column.variable);
    this.dataForm = this.toFormGroup(this.data[0], true);

    this.dataForm.addControl('dataArray', this._formBuilder.array(this.data.map(o => this.toFormGroup(o, false))));
    this.dataSource = new MatTableDataSource(this.data);
    this.initInsumos();
  }
  private initInsumos(){
    this.insumosServices.getAll().subscribe(insumos => {
      this.insumos = insumos;
    });
  }
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  
  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.Nombre === f2.Nombre;
  }

  toFormGroup(row: any, empty: boolean) {
    let group: any = {};
    const allProperties = Object.keys(row);
    allProperties.forEach(property => {
      group[property] = new FormControl(empty ? '' : row[property]);
    });

    return new FormGroup(group);
  }
  //   public convertModelToFormGroup(row:any, empty:boolean):FormGroup{
  //     const allProperties=Object.keys(row);
  //     allProperties.forEach(property=>{
  //       this.dataForm.addControl(property , new FormControl(empty?'':row[property], Validators.compose([ Validators.required])));
  //     })

  // this.data[0].forEach(
  //         (prop) => {
  //             this.dataForm.addControl(prop , new FormControl(this.data[prop], Validators.compose([ Validators.required])));
  //         }
  //     );
  //   }
  public addRow() {
    this.dataArray.push(this.toFormGroup(this.data[0], true));
    this.data.push(this.returnNewObject());
    this.dataSource = new MatTableDataSource(this.data);

  }
  public returnNewObject(): Object {
    const allProperties = Object.keys(this.data[0]);
    let newObject = {};
    allProperties.forEach(property => {
      newObject[property] = null;
    });
    return newObject;
  }

}
