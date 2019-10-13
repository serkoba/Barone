import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { CoccionModel } from 'src/app/modules/shared/models/coccion/coccion.model';
import { EstilosModel } from 'src/app/modules/shared/models/estilos.model';
import { SelectItem } from 'src/app/core/models/select-item';
import { CoccionesService } from 'src/app/modules/coccion/services/cocciones.service';
import { SnackManagerService } from 'src/app/core/services/snack-manager.service';
import { ProductosService } from '../../services/productos.service';
import { MatDialogRef, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { EstilosService } from 'src/app/modules/estilos/services/estilos.service';
import { ProductosModel, StockProductos } from 'src/app/modules/shared/models/productos.model';
import { mergeMap, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-producto-estilo',
  templateUrl: './producto-estilo.component.html',
  styleUrls: ['./producto-estilo.component.scss']
})
export class ProductoEstiloComponent implements OnInit {

  estilos: EstilosModel[] = [];
  estilosSelect: SelectItem[] = [];
  cocciones: CoccionModel[];
  coccionesSelect: SelectItem[] = [];
  msg: string;
  indLoading: boolean = false;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  public TodosLosProductos: boolean;


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ProductosCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  productos: string[] = [];
  IdEstilo: number;
  IdCoccion: number;
  Stock:number;
  CoccionSelected: CoccionModel;
  filterProducts: Observable<ProductosModel[]>;
  products:ProductosModel[];
  @ViewChild('fruitInput') fruitInput: ElementRef;

  constructor(private coccionServices: CoccionesService, public _snack: SnackManagerService, public estilosServices: EstilosService,
    private productosServices: ProductosService,
    public dialogRef: MatDialogRef<ProductoEstiloComponent>) {

  }

  ngOnInit() {
    this.TodosLosProductos = false;
    this.loadEstilos();
    this.loadCocciones();
    
    this.productosServices.getAll().subscribe(productos => {
      this.products = productos;
      this.setFilter();

  });

  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.productos.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.ProductosCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.productos.indexOf(fruit);

    if (index >= 0) {
      this.productos.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.productos.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.ProductosCtrl.setValue(null);
  }

  private _filter(value: string | null): ProductosModel[] {
    const filterValue = (value != undefined || value != null) ? value.toLowerCase() : null;
   

    return this.products.filter(producto => (value == null || producto.Nombre.toLowerCase().indexOf(filterValue) === 0));
}
public setFilter() {
    
    this.filterProducts = this.ProductosCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => this._filter(fruit)));

}

  public loadEstilos() {
    this.estilosServices.getAll().subscribe(estilos => {
      this.estilos = estilos;
      this.estilosSelect = estilos.map(estilo => { return new SelectItem({ value: estilo.IdEstilo, viewValue: estilo.Nombre }) });
    })
  }
  public loadCocciones() {
    this.coccionServices.getAll().subscribe(cocciones => {
      this.cocciones = cocciones;
      this.coccionesSelect = cocciones.map(coccion => { return new SelectItem({ value: coccion.id, viewValue: coccion.NroLote }) });
    })
  }
  public changeNroLote(idCoccion: number) {
    this.CoccionSelected = this.cocciones.find(x => x.id === idCoccion);
    //  this.Estilo = this.barril.Coccion.Receta.Estilo;// this.estilos.find(x => x.IdEstilo === this.barril.Coccion.Receta.Estilo.IdEstilo);
    this.IdEstilo = this.CoccionSelected.Receta.Estilo.IdEstilo;// this.estilos.find(x => x.IdEstilo === this.barril.Coccion.Receta.Estilo.IdEstilo).IdEstilo;
  }
  public HayEstilo() {
    return this.IdEstilo != undefined;
  }
  private updateAllProductos(): Observable<void> {
    return this.productosServices.updateAll(new StockProductos({ Cantidad:this.Stock, Coccion: this.CoccionSelected }));
  }
  private updatePartial(): Observable<void> {
    return from(this.productos).pipe(
      mergeMap(producto => {
        let productoModel= this.products.find(x=>x.Nombre ===producto);
        const StockProducto = new StockProductos({ Producto: productoModel, Coccion: this.CoccionSelected, Cantidad:this.Stock });
        return this.productosServices.updatePartialStockProducto(StockProducto);
      }))
  }
  onSubmit() {
    const functionToCall = this.TodosLosProductos ? this.updateAllProductos() : this.updatePartial();
    functionToCall
      .subscribe(() => {
        this.dialogRef.close("success");
        this._snack.openSnackBar("Productos Actualizado", 'Success');
      }, error => {
        this._snack.openSnackBar(error, 'Error');
        this.dialogRef.close("error");

      });

  }

}
