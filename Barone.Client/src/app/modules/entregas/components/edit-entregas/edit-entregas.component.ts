import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { EntregaModel } from '../../../shared/models/entrega.model';
import { MatDialogRef, MatChipInputEvent, MatAutocompleteSelectedEvent, MatDialog } from '@angular/material';
import { BarrilModel } from '../../../shared/models/barril.model';
import { ClientsModel } from '../../../shared/models/clients.model';
import { PedidoModel } from '../../../shared/models/pedido.model';
import { ButtonGroup } from '../../../../core/models/button-group';
import { ClientsService } from '../../../clients/services/clients.service';
import { ItemChip } from '../../../shared/models/item-chip';
import { BarrilesService } from '../../../barriles/services/barriles.service';
import { FormControl } from '@angular/forms';
import { Observable, from, of, concat } from 'rxjs';
import { startWith, map, concatMap, mergeMap, last, switchMap, zip } from 'rxjs/operators';
import { RowEntrega, RowEntregaLata } from '../../../shared/models/row-entrega';
import { AddEntregaComponent } from '../add-entrega/add-entrega.component';
import { EstilosModel } from '../../../shared/models/estilos.model';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { EntregasService } from '../../services/entregas.service';
import { SnackManagerService } from '../../../../core/services/snack-manager.service';
import { PedidosService } from 'src/app/modules/pedidos/services/pedidos.service';
import { SelectItem } from 'src/app/core/models/select-item';
import { TipoEstadoBarril } from 'src/app/modules/shared/enum/enums';
import { ProductosService } from 'src/app/modules/productos/services/productos.service';

@Component({
    selector: 'edit-entregas',
    templateUrl: './edit-entregas.component.html',
    styleUrls: ['./edit-entregas.component.scss']
})
export class EditEntregasComponent implements OnInit {
    Estados: SelectItem[] = [
        { value: 1, viewValue: 'Para Despacho' },
        { value: 2, viewValue: 'Incompleto' }
    ];
    msg: string;
    indLoading: boolean = false;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    selectedOption: string;
    entrega: EntregaModel;
    public PedidoAsignados: EntregaModel;
    public rowCollection: RowEntrega[] = [];
    Barriles: BarrilModel[];
    public pedido: PedidoModel;
    enabled: boolean;
    removable = true;
    public rowSelected: RowEntrega;
    isREADONLY: boolean = false;
    @ViewChild('fruitInput') fruitInput: ElementRef;
    visible = true;
    selectable = true;

    addOnBlur = false;
    BarrilCtrl = new FormControl();
    filteredBarriles: Observable<BarrilModel[]>;
    barrilesPedidos: ItemChip[] = [];

    clientes: ClientsModel[] = [];
    clientesItems: SelectItem[] = [];
    SelectedItem: SelectItem;
    barriles: BarrilModel[];
    Cantidad: number;
    Tipo: string;
    estilo: EstilosModel;


    constructor(private chgRef: ChangeDetectorRef,
        public _snack: SnackManagerService,
        public entregaServices: EntregasService,
        public pedidosServices: PedidosService,
        public dialog: MatDialog,
        private barrilesServices: BarrilesService,
        private clientesServices: ClientsService,
        private productosServices:ProductosService,
        public dialogRef: MatDialogRef<EditEntregasComponent>) {


        this.barrilesServices.getAll().subscribe(barriles => {
            this.barriles = barriles;

        })




        this.clientesServices.getAll().subscribe(clientes => {
            this.clientes = clientes;
            this.clientesItems = clientes.map(cliente => {
                return new SelectItem({
                    smallValue: `CUIT: ${cliente.CUIT}`,
                    viewValue: cliente.RazonSocial,
                    value: cliente.IdCliente
                })
            });
            if ((typeof (this.pedido) != "undefined") || this.dbops === DBOperation.update) {
                this.SelectedItem = this.clientesItems.find(x => x.value === this.entrega.Cliente.IdCliente);
            }


        });

    }

    gridbtns = [
       
        {
          title: 'Borrar',
          icon: 'clear',
          keys: ["id"],
          action: DBOperation.delete,
          ishide: this.isREADONLY
        }];

    columnProductos: any[] =
    [{
      display: 'Producto',
      variable: 'Productos',
      filter: 'text',
      template: 'producto'
    },
    {
      display: 'Cantidad',
      variable: 'Cantidad',
      filter: 'text',
      template: 'text'
    },
    {
        display: 'Acciones',
        variable: 'acciones',
        filter: 'text',
        template: 'acciones',
        Sumarizable:false
      }];

    public openDialog() {
        let dialogRef = null;

        dialogRef = this.dialog.open(AddEntregaComponent);

        dialogRef.beforeClose().subscribe(() => {
            this.rowCollection.push(new RowEntrega({
                id: 0,
                Cantidad: dialogRef.componentInstance.Cantidad,
                Tipo: dialogRef.componentInstance.estilo.Nombre,
                Barriles: [],
                BarrilesEntrega: []
            }))
        })

        dialogRef.afterClosed().subscribe(() => {

        });


    }

    private _filter(value: string | null): BarrilModel[] {
        const filterValue = (value != undefined || value != null) ? value.toLowerCase() : null;
        if (this.rowSelected == undefined) {
            return null;
        }

        return this.barriles.filter(barril => (value == null || barril.NroBarril.toLowerCase().indexOf(filterValue) === 0)
            && barril.idEstado == TipoEstadoBarril.ParaDespacho && (barril.Estilo && barril.Estilo.Nombre == this.rowSelected.Tipo));
    }
    public rowFocus(row: RowEntrega) {
        this.rowSelected = row;
        this.filteredBarriles = this.BarrilCtrl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) => this._filter(fruit)));

    }


    public itemSelected(idCliente: number) {
        this.entrega.IdCliente = idCliente;
        this.entrega.Cliente = this.clientes.find(x => x.IdCliente === idCliente);
    }

    public HayPedido(): boolean {
        return this.rowCollection.length > 0;
    }
    public EsUpdate(): boolean {
        return this.dbops === DBOperation.update;
    }
    public finishEntrega() {
        const HayPedido = this.pedido != undefined;
        this.entrega.Estado = 3;
        this.entregaServices.update(this.entrega)
            .pipe(concatMap((entregaInserted) => {
                const pedido = new PedidoModel({ Estado: "3", idEntrega: this.entrega.idEntrega });
                return this.pedidosServices.updateByEntrega(pedido).pipe(map(() => { return this.entrega.DetalleEntrega; }))

            }), concatMap((detalleEntrega) => {
                let BarrilesAfectados: ItemChip[] = [];
                detalleEntrega.forEach(entrega => BarrilesAfectados = BarrilesAfectados.concat(entrega.BarrilesEntrega));
                //BarrilesAfectados

                   return this.updateBarriles(BarrilesAfectados)
                .pipe(zip(
                    this.updateProductos(),
                    (resultBarriles:Observable<any>,resultProductos:Observable<any>)=>{
                        return resultBarriles;
                    }))

                // return from(BarrilesAfectados).pipe(concatMap(barrilEntregado => {
                //     const barril = this.barriles.find(x => x.NroBarril === barrilEntregado.nombre);
                //     barril.idEstado = 2;
                //     barril.idEntrega = this.entrega.idEntrega;
                //     return this.barrilesServices.updatePartial(barril)

                // }));



            })
            , last(),
            concatMap(()=>{
                let saldo= +this.entrega.Cliente.SaldoCuenta;
                saldo += this.returnSaldo(this.entrega.TotalImporte);
                this.entrega.Cliente.SaldoCuenta=saldo.toString();
                 return this.clientesServices.update(this.entrega.Cliente); 
            }))
            .subscribe((result) => {
                this.dialogRef.close("success");

                this._snack.openSnackBar("Entrega Finalizada Exitosamente", 'Success');



            }, error => {
                this._snack.openSnackBar(error, 'Error');
                this.dialogRef.close("error");

            });

    }


    public returnSaldo(saldo:string){
        if (isNaN(+saldo)){
          return 0;
        }
        return +saldo;
      }

    public add(event: MatChipInputEvent, row: RowEntrega): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            row.BarrilesEntrega.push(new ItemChip({ cantidad: 1, nombre: value.trim() }));
            this.reCalculateBarriles();
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.BarrilCtrl.setValue(null);
    }

    remove(barril: string, row: RowEntrega): void {
        const index = row.BarrilesEntrega.findIndex(x => x.nombre === barril);

        if (index >= 0) {
            row.BarrilesEntrega.splice(index, 1);
            this.reCalculateBarriles();
        }
    }

    selected(event: MatAutocompleteSelectedEvent, row: RowEntrega): void {
        row.BarrilesEntrega.push(new ItemChip({ cantidad: 1, nombre: event.option.viewValue }));
        this.fruitInput.nativeElement.value = '';
        this.BarrilCtrl.setValue(null);
        this.reCalculateBarriles();

    }
    public changeCantidadLata(value:any){
        this.reCalculateBarriles();
    }
    private reCalculateBarriles() {
        let disCountClient = this.entrega.Cliente ? Number(this.entrega.Cliente.margen) : 0;
        let TotalBarriles = 0;
        let TotalLitros = 0;
        let TotalImporte = 0;
        this.rowCollection.forEach(row => {
            TotalBarriles += row.BarrilesEntrega.length;
            let precio = 0;
            let TotalLitrosByTipo=0;
            if (row.BarrilesEntrega.length!=0){
             TotalLitrosByTipo = row.BarrilesEntrega.
                map(barril => {
                    if (this.barriles!= undefined){
                    const barrilSelected = this.barriles.find(x => x.NroBarril === barril.nombre);
                    precio = Number(barrilSelected.Estilo.rangoPrecio.precio) - ((disCountClient * Number(barrilSelected.Estilo.rangoPrecio.precio)) / 100);///precio del litro de barril - bonificacion del cliente.
                    return Number(barrilSelected.CantidadLitros);
                }
                else
                {
                    precio=0;
                    return 0;
                }
                }).
                reduce((sum, current) => sum + current);
            }
            TotalImporte += TotalLitrosByTipo * precio;
            TotalLitros += TotalLitrosByTipo;
        });
        let TotalLatas=0;
        let TotalImporteLatas=0;
        let TotalLitrosLatas=0;
        this.entrega.DetalleProducto.forEach(latas=>{
            TotalLatas +=+latas.Cantidad;
           
                    TotalImporteLatas +=Number(latas.Productos.Precio) * +latas.Cantidad;
                    TotalLitrosLatas +=latas.Productos.Litros * +latas.Cantidad;
        });
        
        this.entrega.TotalBarriles = TotalBarriles.toString();
        this.entrega.TotalImporte = (TotalImporte + TotalImporteLatas).toString();
        this.entrega.TotalLitros = (TotalLitros + TotalLitrosLatas).toString();
        //this.entrega.TotalImporteLata=TotalImporteLatas.toString();
        //this.entrega.TotalLitrosLata= TotalLitrosLatas.toString();
        this.entrega.TotalLatas=TotalLatas.toString();
    }

    
  gridaction(gridaction: any): void {

    switch (gridaction.action) {
      case DBOperation.create:
      //  this.addCoccion();
        break;
      case DBOperation.update:
        this.enabled = true;
      //  this.EditCoccion(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.DeleteProducto(gridaction.values[0].value);
        break;
    

    }

  }

  private DeleteProducto(id:number){

    this.entrega.DetalleProducto=this.entrega.DetalleProducto.slice(id,-1);


  }





    ngOnInit() {
        this.chgRef.detach();
        this.InicializarEntrega();

        this.rowCollection = this.entrega.DetalleEntrega;
        if (this.dbops != DBOperation.update) {
            this.rowCollection.map(row => {
                row.BarrilesEntrega = row.Barriles.map(barril => { return new ItemChip({ cantidad: 1, nombre: barril.NroBarril }) });
            })
        }
        //  }


        this.chgRef.detectChanges();
        this.chgRef.reattach();
    }
    public InicializarEntrega() {
        if (typeof (this.pedido) != "undefined") {
            this.entrega = new EntregaModel({
                fechaPactada: Number.parseInt(this.pedido.fechaPactada),
                DetalleEntrega: this.generateDetallePedido(JSON.parse(this.pedido.DetallePedido)),
                Cliente: this.pedido.Cliente,
                IdCliente: this.pedido.IdCliente,
                Estado: 1,
                EstadoDelivery: 1,
                DetalleProducto:this.generateDetalleEnvasado(JSON.parse(this.pedido.DetallePedidoProducto))
            });
        }
        else {
            if (this.dbops === DBOperation.create) {
                this.entrega = new EntregaModel({
                    fechaPactada: new Date().getDate(),
                    DetalleEntrega: this.generateDetallePedido(null),
                    Cliente: null,
                    IdCliente: null,
                    Estado: 1,
                    EstadoDelivery: 1,
                    DetalleProducto:[RowEntregaLata.empty()]
                });
            }
        }

    }

    onSubmit() {

      //  var currentDate = new Date();
      //  this.entrega.fecha = currentDate.getFullYear().toString() + "/" + currentDate.getMonth().toString() + "/" + currentDate.getDay().toString();
        switch (this.dbops) {
            case DBOperation.create:
                this.saveEntrega(false);


                break;
            case DBOperation.update:
                this.saveEntrega(true);

                break;
            case DBOperation.delete:

                this.entregaServices.delete(this.entrega.idEntrega).subscribe(() => {
                    this.dialogRef.close("success");
                    this._snack.openSnackBar("Rango Eliminado", 'Success');

                }, error => {
                    this._snack.openSnackBar(error, 'Error');
                    this.dialogRef.close("error");

                });

                break;

        }
    }
    private generateDetallePedido(detallePedido: ItemChip[]): RowEntrega[] {
        if (detallePedido == null) {
            return [];
        }
        return detallePedido.map(pedido => {
            return new RowEntrega({ id: 0, Tipo: pedido.nombre, Cantidad: pedido.cantidad, Barriles: [] })
        })
    }
    private generateDetalleEnvasado(detalleEnvasado: RowEntregaLata[]): RowEntregaLata[] {
        if (detalleEnvasado == null) {
            return [];
        }
        return detalleEnvasado.map(pedido => {
            return new RowEntregaLata({ id: pedido.id,  Cantidad: pedido.Cantidad, Productos: pedido.Productos })
        })
    }
    private saveEntrega(actualiza: boolean) {
        const HayPedido = this.pedido != undefined;
        this.entrega.Estado = 2;
        this.entrega.DetallePedido = JSON.stringify(this.rowCollection);
        this.entrega.DetallePedidoProducto=JSON.stringify(this.entrega.DetalleProducto);
        const operacionEntrega = actualiza ? this.entregaServices.update(this.entrega) : this.entregaServices.insert(this.entrega);
        operacionEntrega
            .pipe(concatMap((entregaInserted) => {
                if (HayPedido) {
                    this.pedido.Estado = "2";
                    if (!actualiza)
                        this.pedido.idEntrega = entregaInserted.idEntrega;
                    return this.pedidosServices.update(this.pedido).pipe(map(() => { return this.entrega.DetalleEntrega; }))
                } else {
                    return of(this.entrega.DetalleEntrega);
                }
            }), switchMap((detalleEntrega) => {
                let BarrilesAfectados: ItemChip[] = [];
                if (detalleEntrega.length!=0)
                detalleEntrega.forEach(entrega => BarrilesAfectados = BarrilesAfectados.concat(entrega.BarrilesEntrega));
                //  BarrilesAfectados
                // return this.updateBarriles(BarrilesAfectados)
                // .pipe(zip(
                //     this.updateProductos(),
                //     (resultBarriles:Observable<any>,resultProductos:Observable<any>)=>{
                //         return resultBarriles;
                //     }))
                //return zip((this.updateBarriles(BarrilesAfectados),this.updateProductos()),result =>{return of(true)});

                if (BarrilesAfectados.length==0){
                    return of(true);
                }

                return from(BarrilesAfectados).pipe(concatMap(barrilEntregado => {
                    const barril = this.barriles.find(x => x.NroBarril === barrilEntregado.nombre);
                    barril.idEstado = 4;
                    return this.barrilesServices.updatePartial(barril)

                }));



            }), last())
            .subscribe((result) => {
                this.dialogRef.close("success");
                if (actualiza) {
                    this._snack.openSnackBar("Entrega Creada Exitosamente", 'Success');
                }
                else {
                    this._snack.openSnackBar("Entrega Actualizada", 'Success');
                }

            }, error => {
                this._snack.openSnackBar(error, 'Error');
                this.dialogRef.close("error");

            });
    }

    private updateBarriles(BarrilesAfectados:ItemChip[]):Observable<any>{
        if (BarrilesAfectados.length==0){
            return of(true);
        }

        return from(BarrilesAfectados).pipe(mergeMap(barrilEntregado => {
            const barril = this.barriles.find(x => x.NroBarril === barrilEntregado.nombre);
            barril.idEstado = 2;
            barril.idEntrega = this.entrega.idEntrega;
            return this.barrilesServices.updatePartial(barril)

        }));

        

    }
    private updateProductos():Observable<any>{

        if (this.entrega.DetalleProducto.length==0){
            return of(true);
        }

        return from(this.entrega.DetalleProducto).pipe(mergeMap(productos => {

            if (productos.Productos ==null || productos.Productos.id==0)
            return of(true);
            productos.Productos.Stock=productos.Productos.Stock- +productos.Cantidad;
            return this.productosServices.updatePartial(productos.Productos)
            
        }));

    }

}
