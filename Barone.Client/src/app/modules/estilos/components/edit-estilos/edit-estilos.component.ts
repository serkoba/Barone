import { Component, OnInit } from '@angular/core';
import { DBOperation } from '../../../../core/enum/enum.enum';
import { EstilosModel } from '../../../shared/models/estilos.model';
import { SnackManagerService } from '../../../../core/core.module.export';
import { EstilosService } from '../../services/estilos.service';
import { MatDialogRef } from '@angular/material';
import { SelectItem } from '../../../shared/models/select-item';
import { RangosService } from '../../../rangos/services/rangos.service';
import { RangoModel } from '../../../shared/models/rango.model';

@Component({
  selector: 'app-edit-estilos',
  templateUrl: './edit-estilos.component.html',
  styleUrls: ['./edit-estilos.component.scss']
})
export class EditEstilosComponent implements OnInit {

  rangosSelect: SelectItem[] = [];
   rangos:RangoModel[]=[];
  
  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  estilo: EstilosModel;

  filteredStates: any;
  constructor(public _rangoServices:RangosService,public _snack:SnackManagerService, public estiloServices:EstilosService,public dialogRef: MatDialogRef<EditEstilosComponent>) { }

  ngOnInit() {
    if (typeof (this.estilo) == "undefined")
    this.estilo = new EstilosModel();
    this.loadRangos();
  }
  public loadRangos(){
    this._rangoServices.getAll().subscribe(rangos=>{
        this.rangosSelect=  rangos.map(rango =>{ return new SelectItem({value:rango.idRango,viewValue:rango.NombreRango })});
        this.rangos=rangos;
    })
  }
  public changeSelect(idRango:Number){
    this.estilo.rangoPrecio=this.rangos.find(x=> x.idRango===idRango);
  }
  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:

      this.estiloServices.insert(this.estilo).subscribe((result)=>{
        this.estilo.IdEstilo=result.IdEstilo;
        this.dialogRef.close("success");
        this._snack.openSnackBar("Estilo Creado Exitosamente",'Success');
       
       },error =>{
        this._snack.openSnackBar(error,'Error');
         this.dialogRef.close("error");
         
       });
      
        break;
      case DBOperation.update:

           this.estiloServices.update(this.estilo).subscribe(()=>{
            this.dialogRef.close("success");
            this._snack.openSnackBar("Estilo Actualizado",'Success');
           
           },error =>{
            this._snack.openSnackBar(error,'Error');
             this.dialogRef.close("error");
             
           });
        
        break;
      case DBOperation.delete:

      this.estiloServices.delete(this.estilo.IdEstilo).subscribe(()=>{
        this.dialogRef.close("success");
        this._snack.openSnackBar("Estilo Eliminado",'Success');
       
       },error =>{
        this._snack.openSnackBar(error,'Error');
         this.dialogRef.close("error");
         
       });
       
        break;

    }
  }

}