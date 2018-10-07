import { Component, OnInit } from '@angular/core';
import { EntregaModel } from '../../../shared/models/entrega.model';
import {  MatDialogRef } from '@angular/material';
import { SelectItem } from '../../../shared/models/select-item';
import { BarrilModel } from '../../../shared/models/barril.model';
import { ClientsModel } from '../../../shared/models/clients.model';
import { PedidoModel } from '../../../shared/models/pedido.model';
import { ButtonGroup } from '../../../../core/models/button-group';

@Component({
  selector: 'edit-entregas',
  templateUrl: './edit-entregas.component.html',
  styleUrls: ['./edit-entregas.component.scss']
})
export class EditEntregasComponent implements OnInit {
  Estados: SelectItem[] = [
    {value: 1, viewValue: 'Para Despacho'},
    {value: 2, viewValue: 'Incompleto'}
  ];
  msg: string;
  indLoading: boolean = false;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  entrega: EntregaModel;
  public PedidoAsignados:EntregaModel;
  public rowCollection:any[]=[{ id: "", Tipo: "", Cantidad: "", Barriles: Array<ButtonGroup>() }];
Barriles:BarrilModel[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  

  constructor(public dialogRef: MatDialogRef<EditEntregasComponent>) {
   
  }

  public subtractCantidad(barril:string){
    const barrilSelected= this.Barriles.find(x=> x.NroBarril===barril);
    
    this.PedidoAsignados.Barriles.push(barrilSelected);
    let barrilToRemove = this.rowCollection.find(x=>x.Tipo===barrilSelected.Estilo);
    barrilToRemove.Barriles.splice(barrilToRemove.Barriles.findIndex(b=>b.text===barril),1);
  }

  ngOnInit() {
    if (typeof (this.entrega) == "undefined"){
    this.entrega = new EntregaModel();
    this.entrega.Cliente = new ClientsModel();
    this.entrega.Pedido= new PedidoModel();
    this.entrega.Pedido.DetallePedido="IPA, Honey";
    this.Barriles=[];
    this.Barriles.push({  id: 1, NroBarril: "002"
    , CantidadLitros: "70", idEstado: 1});
    this.Barriles.push({  id: 2, NroBarril: "003"
    , CantidadLitros: "70", idEstado: 1});
  this.rowCollection=  this.GeneratePedido();
  this.PedidoAsignados = new EntregaModel();
  this.PedidoAsignados.Barriles=[];

    }
  }

  onSubmit() {
   
  }


  public GeneratePedido() {
    var rowCollection = [{ id: "", Tipo: "", Cantidad: "", Barriles: Array<ButtonGroup>() }];
    var items = { id: "", Tipo: "", Cantidad: "", Barriles: Array<ButtonGroup>() };
    var TypeBeer = this.entrega.Pedido.DetallePedido.split(',');
    TypeBeer.map(value =>{
      var result = rowCollection.find(item => item.Tipo === value);
      if (typeof (result) == "undefined") {
        items = { id: "1", Tipo: value, Cantidad: "1", Barriles:[{id:this.Barriles[0].id.toString(),text:this.Barriles[0].NroBarril},{id:this.Barriles[1].id.toString(),text:this.Barriles[1].NroBarril}] };
        rowCollection.push(items);
      }
    });
  
    
    return rowCollection;
    //const grouped = groupBy($scope.PedidoSelected, PedidoSelected => PedidoSelected.type);
}
public removeRowPedido(row:BarrilModel){
  const indexToDelete = this.PedidoAsignados.Barriles.indexOf(row);
  this.PedidoAsignados.Barriles.splice(indexToDelete,1);
 // this.rowCollection.push(row);

 let rowStyle = this.rowCollection.find(x=> x.Tipo===row.Estilo);
const barrilToAdd = rowStyle.Barriles.find(x=> x.NroBarril===row.NroBarril);
  rowStyle.Barriles.push({id:row.id.toString(),text:row.NroBarril});

}
}
