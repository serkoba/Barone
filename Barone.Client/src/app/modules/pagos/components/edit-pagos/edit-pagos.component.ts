import { Component, OnInit } from '@angular/core';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { PagosModel } from '../../../shared/models/pagos.model';
import { MatDialogRef } from '@angular/material';
import { PagosService } from '../../services/pagos.service';
import { SnackManagerService, SelectItem } from '../../../../core/core.module.export';
import { ClientsService } from '../../../clients/services/clients.service';
import { ClientsModel } from '../../../shared/models/clients.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, concatMap } from 'rxjs/operators';

@Component({
  selector: 'edit-pagos',
  templateUrl: './edit-pagos.component.html',
  styleUrls: ['./edit-pagos.component.scss']
})
export class EditPagosComponent implements OnInit {


  Tipos: SelectItem[] = [
    { value: 0, viewValue: 'Seleccione Categoria' },
    { value: 1, viewValue: 'Efectivo' },
    { value: 2, viewValue: 'Cheque' },
    {value: 3 , viewValue:'Transferencia'}
  ];

  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  pago: PagosModel;
  clientes: ClientsModel[] = [];
  clientesItems: SelectItem[] = [];
  cliente: ClientsModel;
  SelectedItem: SelectItem;

  constructor(private clientesServices: ClientsService, private _snack: SnackManagerService,
    private pagosServices: PagosService,
    public dialogRef: MatDialogRef<EditPagosComponent>) {
    this.clientesServices.getAll().subscribe(clientes => {
      this.clientes = clientes;
      this.clientesItems = clientes.map(cliente => {
        return new SelectItem({
          smallValue: `CUIT: ${cliente.CUIT}`,
          viewValue: cliente.RazonSocial,
          value: cliente.IdCliente
        })
      });
      if (this.dbops === DBOperation.update) {
        this.SelectedItem = this.clientesItems.find(x => x.value === this.pago.Cliente.IdCliente);
      }


    });
  }
  public itemSelected(idCliente: number) {
    this.pago.IdCliente = idCliente;
    this.pago.Cliente = this.clientes.find(x => x.IdCliente === idCliente);
  }

  ngOnInit() {
    if (typeof (this.pago) == "undefined")
      this.pago = new PagosModel();




  }
  public returnSaldo(saldo:string){
    if (isNaN(+saldo)){
      return 0;
    }
    return +saldo;
  }

  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:

        this.pagosServices.insert(this.pago)
        .pipe(concatMap((pago)=>{
          this.pago.idPago = pago.idPago;
          let saldo= +this.pago.Cliente.SaldoCuenta;
          saldo -= this.returnSaldo(this.pago.Importe);
          this.pago.Cliente.SaldoCuenta=saldo.toString();
           return this.clientesServices.update(this.pago.Cliente); 
        }))
        .subscribe(() => {
        
          this.dialogRef.close("success");
          this._snack.openSnackBar("Pago Creado Exitosamente", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.update:

        this.pagosServices.update(this.pago).pipe(concatMap(()=>{
          let saldo= +this.pago.Cliente.SaldoCuenta;
          saldo -= this.returnSaldo(this.pago.Importe);
          this.pago.Cliente.SaldoCuenta=saldo.toString();
           return this.clientesServices.update(this.pago.Cliente); 
        }))
        .subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Pago Actualizado", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.delete:

        this.pagosServices.delete(this.pago.idPago).pipe(concatMap(()=>{
          let saldo= +this.pago.Cliente.SaldoCuenta;
          saldo -= this.returnSaldo(this.pago.Importe);
          this.pago.Cliente.SaldoCuenta=saldo.toString();
           return this.clientesServices.update(this.pago.Cliente); 
        })).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Pago Eliminado", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;

    }
  }


}