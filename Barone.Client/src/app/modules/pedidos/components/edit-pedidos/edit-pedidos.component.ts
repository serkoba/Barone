import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { startWith, map, first } from 'rxjs/operators';
import { SelectItem } from '../../../shared/models/select-item';
import { PedidoModel } from '../../../shared/models/pedido.model';
import { ClientsModel } from '../../../shared/models/clients.model';
import { ClientsService } from '../../../clients/services/clients.service';
import Popper from 'popper.js';
import { Constructable } from '../../../../core/models/constructable';
import { BarrilModel } from '../../../shared/models/barril.model';
import { BarrilesService } from '../../../barriles/services/barriles.service';
import { EstilosModel } from '../../../shared/models/estilos.model';
import { EstilosService } from '../../../estilos/services/estilos.service';
import { PedidosService } from '../../services/pedidos.service';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { SnackManagerService } from '../../../../core/core.module.export';

export class ItemChip  extends Constructable<Partial<ItemChip>>{
  cantidad:number;
  nombre:string;
}

@Component({
  selector: 'edit-pedidos',
  templateUrl: './edit-pedidos.component.html',
  styleUrls: ['./edit-pedidos.component.scss']
})
export class EditPedidosComponent implements OnInit {

 
  Estilos: SelectItem[] = [
    {value: 0, viewValue: 'Seleccione Categoria'},
    {value: 1, viewValue: 'IPA'},
    {value: 2, viewValue: 'Honey'},
    {value: 3, viewValue: 'Banana'},
    {value: 4, viewValue: 'Winer'}
  ];
  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  pedido: PedidoModel;
  public Cantidad:number;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();

  clientes: ClientsModel[]=[];
  cliente:ClientsModel;
  estilos:EstilosModel[];
  
  filteredEstilos: Observable<EstilosModel[]>;
  barrilesPedidos: ItemChip[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef;

  constructor(private pedidosServices:PedidosService,private _snack:SnackManagerService,
    private estilosServices:EstilosService,private clientesServices:ClientsService,public dialogRef: MatDialogRef<EditPedidosComponent>) {

    this.clientesServices.getAll().subscribe(clientes=>{
      this.clientes=clientes;
    

   });
   this.estilosServices.getAll().subscribe(estilos=>{
     this.estilos=estilos;
     this.filteredEstilos = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.estilos.slice()));
   })

}

public recordHidden(item: ItemChip) {
  item.cantidad=this.Cantidad;
  this.reCalculateBarriles();
}

public itemSelected(idCliente:number){
  this.pedido.IdCliente=idCliente;
  this.pedido.Cliente=this.clientes.find(x=>x.IdCliente===idCliente);
}



  

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.barrilesPedidos.push(new ItemChip({cantidad:1,nombre:value.trim()}));
      this.reCalculateBarriles();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.barrilesPedidos.findIndex(x=>x.nombre===fruit);

    if (index >= 0) {
      this.barrilesPedidos.splice(index, 1);
      this.reCalculateBarriles();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.barrilesPedidos.push(new ItemChip({cantidad:1,nombre:event.option.viewValue}));
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    this.reCalculateBarriles();
    
  }
  private reCalculateBarriles(){
    let cantidad=0;
    this.barrilesPedidos.forEach(barril=>{
cantidad+=barril.cantidad;
    })
    this.pedido.TotalBarriles=cantidad;
  }

  private _filter(value: string): EstilosModel[] {
    const filterValue = value.toLowerCase();

    return this.estilos.filter(estilo => estilo.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    if (typeof (this.pedido) == "undefined")
    this.pedido = new PedidoModel();

    if (typeof (this.pedido) != "undefined" && this.pedido.DetallePedido!='')
    this.barrilesPedidos=JSON.parse(this.pedido.DetallePedido);
  }

  onSubmit() {
    this.pedido.DetallePedido=JSON.stringify(this.barrilesPedidos);
    switch (this.dbops) {
      case DBOperation.create:
      this.pedido.Estado="1";
      this.pedidosServices.insert(this.pedido).subscribe((result)=>{
        this.pedido.id=result.id;
        this.dialogRef.close("success");
        this._snack.openSnackBar("Rango Creado Exitosamente",'Success');
       
       },error =>{
        this._snack.openSnackBar(error,'Error');
         this.dialogRef.close("error");
         
       });

        break;
      case DBOperation.update:
           this.pedidosServices.update(this.pedido).subscribe(()=>{
            this.dialogRef.close("success");
            this._snack.openSnackBar("Rango Actualizado",'Success');
           
           },error =>{
            this._snack.openSnackBar(error,'Error');
             this.dialogRef.close("error");
             
           });
       
        break;
      case DBOperation.delete:

      this.pedidosServices.delete(this.pedido.id).subscribe(()=>{
        this.dialogRef.close("success");
        this._snack.openSnackBar("Rango Eliminado",'Success');
       
       },error =>{
        this._snack.openSnackBar(error,'Error');
         this.dialogRef.close("error");
         
       });
        /*  this._userService.delete(Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(
            data => {
              if (data == 1) //Success
              {
                this.dialogRef.close("success");
              }
              else {
                this.dialogRef.close("error");
              }
            },
            error => {
              this.dialogRef.close("error");
            }
          );*/
        break;

    }
   
  }
}