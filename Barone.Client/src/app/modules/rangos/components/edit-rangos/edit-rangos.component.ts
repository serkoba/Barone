import { Component, OnInit, ViewChild } from '@angular/core';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { MatDialogRef } from '@angular/material';
import { RangoModel } from '../../../shared/models/rango.model';
import { RangosService } from '../../services/rangos.service';

import { SnackManagerService } from '../../../../core/core.module.export';

@Component({
  selector: 'edit-rangos',
  templateUrl: './edit-rangos.component.html',
  styleUrls: ['./edit-rangos.component.css']
})
export class EditRangosComponent implements OnInit {

  
  
  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  rango: RangoModel;

  filteredStates: any;
  constructor(public _snack:SnackManagerService, public rangoServices:RangosService,public dialogRef: MatDialogRef<EditRangosComponent>) { }

  ngOnInit() {
    if (typeof (this.rango) == "undefined")
    this.rango = new RangoModel();
  }
  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:

      this.rangoServices.insert(this.rango).subscribe((result)=>{
        this.rango.idRango=result.idRango;
        this.dialogRef.close("success");
        this._snack.openSnackBar("Rango Creado Exitosamente",'Success');
       
       },error =>{
        this._snack.openSnackBar(error,'Error');
         this.dialogRef.close("error");
         
       });
 
        break;
      case DBOperation.update:
           this.rangoServices.update(this.rango).subscribe(()=>{
            this.dialogRef.close("success");
            this._snack.openSnackBar("Rango Actualizado",'Success');
           
           },error =>{
            this._snack.openSnackBar(error,'Error');
             this.dialogRef.close("error");
             
           });
      
        break;
      case DBOperation.delete:

      this.rangoServices.delete(this.rango.idRango).subscribe(()=>{
        this.dialogRef.close("success");
        this._snack.openSnackBar("Rango Eliminado",'Success');
       
       },error =>{
        this._snack.openSnackBar(error,'Error');
         this.dialogRef.close("error");
         
       });
      
        break;

    }
  }

}