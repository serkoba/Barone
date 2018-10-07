import { Component, OnInit } from '@angular/core';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { PagosModel } from '../../../shared/models/pagos.model';
import { MatDialogRef } from '@angular/material';
import { SelectItem } from '../../../shared/models/select-item';
import { PagosService } from '../../services/pagos.service';
import { SnackManagerService } from '../../../../core/core.module.export';
import { ClientsService } from '../../../clients/services/clients.service';
import { ClientsModel } from '../../../shared/models/clients.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'edit-pagos',
  templateUrl: './edit-pagos.component.html',
  styleUrls: ['./edit-pagos.component.scss']
})
export class EditPagosComponent implements OnInit {


  Tipos: SelectItem[] = [
    {value: 0, viewValue: 'Seleccione Categoria'},
    {value: 1, viewValue: 'Efectivo'},
    {value: 2, viewValue: 'Cheque'}
  ];
  
  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  pago: PagosModel;
  clientes: ClientsModel[]=[];

  cliente:ClientsModel;

  constructor(private clientesServices:ClientsService,private _snack:SnackManagerService,
    private pagosServices:PagosService,
    public dialogRef: MatDialogRef<EditPagosComponent>) {
      this.clientesServices.getAll().subscribe(clientes=>{
        this.clientes=clientes;
      
 
     });
    }
    public itemSelected(idCliente:number){
      this.pago.IdCliente=idCliente;
      this.pago.Cliente=this.clientes.find(x=>x.IdCliente===idCliente);
    }

  ngOnInit() {
    if (typeof (this.pago) == "undefined")
    this.pago = new PagosModel();
  
  }

  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:

      this.pagosServices.insert(this.pago).subscribe((result)=>{
        this.pago.idPago=result.idPago;
        this.dialogRef.close("success");
        this._snack.openSnackBar("Pago Creado Exitosamente",'Success');
       
       },error =>{
        this._snack.openSnackBar(error,'Error');
         this.dialogRef.close("error");
         
       });
      
        break;
      case DBOperation.update:

           this.pagosServices.update(this.pago).subscribe(()=>{
            this.dialogRef.close("success");
            this._snack.openSnackBar("Pago Actualizado",'Success');
           
           },error =>{
            this._snack.openSnackBar(error,'Error');
             this.dialogRef.close("error");
             
           });
        
        break;
      case DBOperation.delete:

      this.pagosServices.delete(this.pago.idPago).subscribe(()=>{
        this.dialogRef.close("success");
        this._snack.openSnackBar("Pago Eliminado",'Success');
       
       },error =>{
        this._snack.openSnackBar(error,'Error');
         this.dialogRef.close("error");
         
       });
       
        break;

    }
  }


}