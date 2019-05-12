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
import { Observable, from, of } from 'rxjs';
import { startWith, map, concatMap, mergeMap, last, switchMap } from 'rxjs/operators';
import { RowEntrega } from '../../../shared/models/row-entrega';
import { AddEntregaComponent } from '../add-entrega/add-entrega.component';
import { EstilosModel } from '../../../shared/models/estilos.model';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { EntregasService } from '../../services/entregas.service';
import { SnackManagerService } from '../../../../core/services/snack-manager.service';
import { PedidosService } from 'src/app/modules/pedidos/services/pedidos.service';
import { SelectItem } from 'src/app/core/models/select-item';
import { TipoEstadoBarril } from 'src/app/modules/shared/enum/enums';

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
        private clientesServices: ClientsService, public dialogRef: MatDialogRef<EditEntregasComponent>) {


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

                return from(BarrilesAfectados).pipe(concatMap(barrilEntregado => {
                    const barril = this.barriles.find(x => x.NroBarril === barrilEntregado.nombre);
                    barril.idEstado = 2;
                    barril.idEntrega = this.entrega.idEntrega;
                    return this.barrilesServices.updatePartial(barril)

                }));



            }), last())
            .subscribe((result) => {
                this.dialogRef.close("success");

                this._snack.openSnackBar("Entrega Finalizada Exitosamente", 'Success');



            }, error => {
                this._snack.openSnackBar(error, 'Error');
                this.dialogRef.close("error");

            });

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
    private reCalculateBarriles() {
        let disCountClient = this.entrega.Cliente ? Number(this.entrega.Cliente.margen) : 0;
        let TotalBarriles = 0;
        let TotalLitros = 0;
        let TotalImporte = 0;
        this.rowCollection.forEach(row => {
            TotalBarriles += row.BarrilesEntrega.length;
            let precio = 0;
            const TotalLitrosByTipo = row.BarrilesEntrega.
                map(barril => {
                    const barrilSelected = this.barriles.find(x => x.NroBarril === barril.nombre);
                    precio = Number(barrilSelected.Estilo.rangoPrecio.precio) - ((disCountClient * Number(barrilSelected.Estilo.rangoPrecio.precio)) / 100);///precio del litro de barril - bonificacion del cliente.
                    return Number(barrilSelected.CantidadLitros);
                }).
                reduce((sum, current) => sum + current);

            TotalImporte += TotalLitrosByTipo * precio;
            TotalLitros += TotalLitrosByTipo;
        })
        this.entrega.TotalBarriles = TotalBarriles.toString();
        this.entrega.TotalImporte = TotalImporte.toString();
        this.entrega.TotalLitros = TotalLitros.toString();
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
                EstadoDelivery: 1
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
                    EstadoDelivery: 1
                });
            }
        }

    }

    onSubmit() {

        var currentDate = new Date();
        this.entrega.fecha = currentDate.getFullYear().toString() + "/" + currentDate.getMonth().toString() + "/" + currentDate.getDay().toString();
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
    private saveEntrega(actualiza: boolean) {
        const HayPedido = this.pedido != undefined;
        this.entrega.Estado = 2;
        this.entrega.DetallePedido = JSON.stringify(this.rowCollection);
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
                detalleEntrega.forEach(entrega => BarrilesAfectados = BarrilesAfectados.concat(entrega.BarrilesEntrega));
                //  BarrilesAfectados

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

}
