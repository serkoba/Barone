import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EntregaModel } from '../../../shared/models/entrega.model';
import { MatDialogRef, MatChipInputEvent, MatAutocompleteSelectedEvent, MatDialog } from '@angular/material';
import { SelectItem } from '../../../shared/models/select-item';
import { BarrilModel } from '../../../shared/models/barril.model';
import { ClientsModel } from '../../../shared/models/clients.model';
import { PedidoModel } from '../../../shared/models/pedido.model';
import { ButtonGroup } from '../../../../core/models/button-group';
import { ClientsService } from '../../../clients/services/clients.service';
import { ItemChip } from '../../../shared/models/item-chip';
import { BarrilesService } from '../../../barriles/services/barriles.service';
import { FormControl } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { RowEntrega } from '../../../shared/models/row-entrega';
import { AddEntregaComponent } from '../add-entrega/add-entrega.component';
import { EstilosModel } from '../../../shared/models/estilos.model';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { EntregasService } from '../../services/entregas.service';
import { SnackManagerService } from '../../../../core/services/snack-manager.service';

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

    @ViewChild('fruitInput') fruitInput: ElementRef;
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = false;
    BarrilCtrl = new FormControl();
    filteredBarriles: Observable<BarrilModel[]>;
    barrilesPedidos: ItemChip[] = [];

    clientes: ClientsModel[] = [];
    barriles: BarrilModel[];
    cliente: ClientsModel;
    Cantidad: number;
    Tipo: string;
    estilo: EstilosModel;


    constructor(public _snack: SnackManagerService,
        public entregaServices: EntregasService,
        public dialog: MatDialog,
        private barrilesServices: BarrilesService,
        private clientesServices: ClientsService, public dialogRef: MatDialogRef<EditEntregasComponent>) {


        this.barrilesServices.getAll().subscribe(barriles => {
            this.barriles = barriles;
            this.filteredBarriles = this.BarrilCtrl.valueChanges.pipe(
                startWith(null),
                map((fruit: string | null) => fruit ? this._filter(fruit) : this.barriles.slice()));
        })




        this.clientesServices.getAll().subscribe(clientes => {
            this.clientes = clientes;


        });

    }
    public openDialog() {
        let dialogRef = null;

        dialogRef = this.dialog.open(AddEntregaComponent);

        // dialogRef.componentInstance.dbops = this.dbops;
        // dialogRef.componentInstance.modalTitle = this.modalTitle;
        // dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        // dialogRef.componentInstance. = this.entrega;
        // const sub = dialogRef.componentInstance.DialogSaved.subscribe((data) => {
        //     this.rowCollection.push(new RowEntrega({ id: 0, Cantidad: data.Cantidad, Tipo: data.Estilo.Nombre, Barriles: [] }))
        // });
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

    private _filter(value: string): BarrilModel[] {
        const filterValue = value.toLowerCase();

        return this.barriles.filter(barril => barril.NroBarril.toLowerCase().indexOf(filterValue) === 0);
    }


    public itemSelected(idCliente: number) {
        this.entrega.IdCliente = idCliente;
        this.entrega.Cliente = this.clientes.find(x => x.IdCliente === idCliente);
    }

    public HayPedido(): boolean {
        return this.rowCollection.length > 0;
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
        let cantidad = 0;
        let TotalBarriles = 0;
        let TotalLitros = 0;
        let TotalImporte = 0;
        this.rowCollection.forEach(row => {
            TotalBarriles += row.BarrilesEntrega.length;
            TotalLitros += row.BarrilesEntrega.
                map(barril => {
                    return Number(this.barriles.find(x => x.NroBarril === barril.nombre).CantidadLitros)
                }).
                reduce((sum, current) => sum + current);
            TotalImporte += row.BarrilesEntrega.
                map(barril => {
                    return Number(this.barriles.find(x => x.NroBarril === barril.nombre).Estilo.rangoPrecio.precio)
                }).
                reduce((sum, current) => sum + current);
        })
        this.entrega.TotalBarriles = TotalBarriles.toString();
        this.entrega.TotalImporte = TotalImporte.toString();
        this.entrega.TotalLitros = TotalLitros.toString();
    }





    ngOnInit() {
        if (typeof (this.pedido) != "undefined") {
            this.InicializarEntrega();
        }
        if (typeof (this.entrega) == "undefined") {
            this.entrega = new EntregaModel();


        }
        else {
            this.rowCollection = this.entrega.DetalleEntrega;
            this.rowCollection.map(row => {
                row.BarrilesEntrega = row.Barriles.map(barril => { return new ItemChip({ cantidad: 1, nombre: barril.NroBarril }) });
            })
        }
    }
    public InicializarEntrega() {
        this.entrega = new EntregaModel({
            fechaPactada: this.pedido.fechaPactada,
            DetalleEntrega: this.generateDetallePedido(JSON.parse(this.pedido.DetallePedido)),
            Cliente: this.pedido.Cliente,
            IdCliente: this.pedido.IdCliente
        });
        this.cliente = this.entrega.Cliente;

    }

    onSubmit() {
        this.entrega.DetallePedido = JSON.stringify(this.rowCollection);
        this.entrega.fecha = new Date().toLocaleDateString();
        switch (this.dbops) {
            case DBOperation.create:
                this.entrega.Estado = "1";
                this.entregaServices.insert(this.entrega).subscribe((result) => {
                    this.entrega.idEntrega = result.idEntrega;
                    this.dialogRef.close("success");
                    this._snack.openSnackBar("Rango Creado Exitosamente", 'Success');

                }, error => {
                    this._snack.openSnackBar(error, 'Error');
                    this.dialogRef.close("error");

                });

                break;
            case DBOperation.update:
                this.entregaServices.update(this.entrega).subscribe(() => {
                    this.dialogRef.close("success");
                    this._snack.openSnackBar("Rango Actualizado", 'Success');

                }, error => {
                    this._snack.openSnackBar(error, 'Error');
                    this.dialogRef.close("error");

                });

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
        return detallePedido.map(pedido => {
            return new RowEntrega({ id: 0, Tipo: pedido.nombre, Cantidad: pedido.cantidad, Barriles: [] })
        })
    }

}
