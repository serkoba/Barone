import { Component, OnInit, ViewChild, TemplateRef, ElementRef, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DataTableDataSource } from '../../models/data-table-data-source';
import { Observable, from } from 'rxjs';
import { GridAction } from '../datagrid/datagrid.component';

@Component({
  selector: 'data-grid-view',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  @Input() columnsToDisplay: any[] = [];
  public displayedColumns: string[];
  @Input() PaginatorEnabled: boolean = true;
  @Input() gridbtns: any[];
  @Input() hdrbtns: any[];
  @Input() data: any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<any[]>();
  @ViewChild('text') public text: TemplateRef<ElementRef>;
  @ViewChild('estado') public estado: TemplateRef<ElementRef>;
  @ViewChild('detallePedido') public detallePedido: TemplateRef<ElementRef>;
  @ViewChild('acciones') public acciones: TemplateRef<ElementRef>;
  @Output() btnclick: EventEmitter<GridAction> = new EventEmitter<GridAction>();
  constructor(private _ref: ChangeDetectorRef) {

  }
  ngOnInit() {
    this.displayedColumns = this.columnsToDisplay.map(column => typeof column.matColumnDef ==='undefined'? column.variable:column.matColumnDef );



    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    //setTimeout(() => {

    //this.dataSource = new DataTableDataSource(this.data, this.paginator, this.sort);
    //}, 2000);
    this._ref.detectChanges();

    // setTimeout(() => {
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
  }
  public checkColumnExist(column:any){
   return typeof column.matColumnDef ==='undefined';
  }

  ngAfterViewInit(){
    this.sort.sortChange.subscribe(()=>{
      console.log('cambio orden');
    });
  }
  ngOnChanges(changes: any) {
    this.dataBind();
  }
  public dataBind() {

    this.dataSource.data = this.data;
    if (this.paginator != undefined && this.PaginatorEnabled) {
      this.paginator._intl.itemsPerPageLabel = 'items por pagina';
      this.dataSource.paginator = this.paginator;
    }
    setTimeout(()=>{
      this.dataSource.sort = this.sort;
    });
    



  }
  click(btn: any, row: any): void {
    let keyds = <GridAction>{};
    keyds.action = btn.action;

    if (row != null) {
      keyds.values = [];
      btn.keys.forEach((key: any) => {
        keyds.values.push({ key: key, value: row[key] });
      });
    }
    this.btnclick.emit(keyds);
  }

  public getTotalColumn(column:any){
    if (column.Sumarizable){
    const result =  this.data.map(t => t[column.variable]).reduce((acc, value) => acc + this.convertNumber(value) , 0);
    return result;
    }
    if (this.columnsToDisplay.findIndex(x=>x.Variable === column.Variable)==0){
      return 'Total';
    }
    return '';
  }
  public enabledFooter(){
    return this.columnsToDisplay.some(x=>x.Sumarizable);
  }
  public convertNumber(value):number{
  
    const result = parseInt(value);
    if (result===null){
      return 0;
    }
    return result;
   
  }
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}