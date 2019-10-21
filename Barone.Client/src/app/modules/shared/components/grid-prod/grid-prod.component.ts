import { Component, OnInit, Input, ViewChild, TemplateRef, ElementRef, Output, EventEmitter } from '@angular/core';
import { InsumoModel } from '../../models/insumo.model';
import { ProductosModel } from '../../models/productos.model';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { InsumosService } from 'src/app/modules/insumos/services/insumos.service';
import { ProductosService } from 'src/app/modules/productos/services/productos.service';
import { GridAction } from 'src/app/core/components/datagrid/datagrid.component';


@Component({
  selector: 'grid-prod',
  templateUrl: './grid-prod.component.html',
  styleUrls: ['./grid-prod.component.scss']
})
export class GridProdComponent implements OnInit {
  @Input() columnsToDisplay: any[] = [];
  @Input() data: any[];
  @Input() public Title: string;
  @Input() public isForProduct:boolean=false;
  @Input() gridbtns: any[];
  @ViewChild('text') public text: TemplateRef<ElementRef>;
  @Output() btnclick: EventEmitter<GridAction> = new EventEmitter<GridAction>();
  @Output() changeText: EventEmitter<any> = new EventEmitter<any>();
  ///Form Data
  public displayedColumns: string[];
  public insumos: InsumoModel[];
  public productos:ProductosModel[];
  dataSource = new MatTableDataSource<any[]>();
  public dataForm: FormGroup;
  get dataArray() {
    return this.dataForm.get('dataArray') as FormArray;
  }
  constructor(public _formBuilder: FormBuilder, private insumosServices: InsumosService, public productoServices:ProductosService) { }

  ngOnInit() {
    this.displayedColumns = this.columnsToDisplay.map(column => column.variable);
    this.dataForm = this.toFormGroup(this.data[0], true);

    this.dataForm.addControl('dataArray', this._formBuilder.array(this.data.map(o => this.toFormGroup(o, false))));
    this.dataSource = new MatTableDataSource(this.data);
    this.initInsumos();
    if (this.isForProduct){
      this.initProducto();
    }
  }
  private initInsumos(){
    this.insumosServices.getAll().subscribe(insumos => {
      this.insumos = insumos;
    });
  }
  changeValue(value:any){
    this.changeText.emit(value);
  }

  click(btn: any, index: any): void {
    // let keyds = <GridAction>{};
    // keyds.action = btn.action;

    // if (index != null) {
    //   keyds.values = [];
    //   btn.keys.forEach((key: any) => {
    //     keyds.values.push({ key: key, value: index });
    //   });
    // }
    // this.btnclick.emit(keyds);
    if (this.dataSource.data.length==1){
      this.addRow();
    }
    this.dataSource.data.splice(index,1);
   
    this.dataSource._updateChangeSubscription();
   
  }

  private initProducto(){
    this.productoServices.getAllDetail().subscribe(productos => {
      this.productos = productos;
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
