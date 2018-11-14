import { Component, OnInit } from '@angular/core';
import { DBOperation, OperationsStock } from 'src/app/core/enum/enum.enum';
import { ComprasModel } from 'src/app/modules/shared/models/compras.model';
import { SnackManagerService } from 'src/app/core/core.module.export';
import { MatDialogRef } from '@angular/material';
import { ComprasService } from '../../services/compras.service';
import { InsumoModel } from 'src/app/modules/shared/models/insumo.model';
import { InsumosService } from 'src/app/modules/insumos/services/insumos.service';
import { ProveedoresService } from 'src/app/modules/proveedores/services/proveedores.service';
import { SelectItem } from 'src/app/core/models/select-item';
import { ProveedoresModel } from 'src/app/modules/shared/models/proveedor.model';
import { concatMap, map } from 'rxjs/operators';

@Component({
  selector: 'edit-compras',
  templateUrl: './edit-compras.component.html',
  styleUrls: ['./edit-compras.component.scss']
})
export class EditComprasComponent implements OnInit {

  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  compra: ComprasModel;
  insumos: InsumoModel[];
  itemProv: SelectItem[] = [];
  SelectedItem: SelectItem;
  proveedores: ProveedoresModel[];

  TipoUnidadMedidas: SelectItem[] = [
    { value: 0, viewValue: 'Seleccione Categoria' },
    { value: 1, viewValue: 'Kg' },
    { value: 2, viewValue: 'gr' }
  ];

  constructor(private _snack: SnackManagerService,
    private comprasServices: ComprasService,
    private insumosServices: InsumosService,
    private proveedoresServices: ProveedoresService,

    public dialogRef: MatDialogRef<EditComprasComponent>) {
  }

  ngOnInit() {
    if (typeof (this.compra) == "undefined")
      this.compra = new ComprasModel();
    this.insumosServices.getAll().subscribe(insumos => this.insumos = insumos);
    this.proveedoresServices.getAll().subscribe(proveedores => {
      this.proveedores = proveedores;
      this.itemProv = proveedores.map(proveedor => {
        return new SelectItem({
          viewValue: proveedor.RazonSocial,
          value: proveedor.id,
          smallValue: proveedor.Direccion,

        })
      });
      if (this.dbops === DBOperation.update) {
        this.SelectedItem = this.itemProv.find(x => x.value === this.compra.Proveedor.id);
      }

    });
  }
  public changeSelect(Insumo: InsumoModel) {
    this.compra.Insumo = Insumo;
    //  this.compra.Insumos_id = this.compra.Insumo.id;
  }

  public itemSelected(idProveedor: number) {
    this.compra.Proveedor = this.proveedores.find(x => x.id === idProveedor);
    this.compra.Proveedor_id = this.compra.Proveedor.id;
  }


  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:

        this.comprasServices.insert(this.compra)
          .pipe(concatMap(result => {
            this.compra.id = result.id;
            return this.comprasServices.UpdateStock(OperationsStock.Add, this.compra);
          }))
          .subscribe(() => {

            this.dialogRef.close("success");
            this._snack.openSnackBar("Compra Creada Exitosamente", 'Success');

          }, error => {
            this._snack.openSnackBar(error, 'Error');
            this.dialogRef.close("error");

          });

        break;
      case DBOperation.update:

        this.comprasServices.update(this.compra)
          .pipe(concatMap(result => {
            return this.comprasServices.UpdateStock(OperationsStock.Add, this.compra);
          }))
          .subscribe(() => {
            this.dialogRef.close("success");
            this._snack.openSnackBar("Compra Actualizada", 'Success');

          }, error => {
            this._snack.openSnackBar(error, 'Error');
            this.dialogRef.close("error");

          });

        break;
      case DBOperation.delete:

        this.comprasServices.delete(this.compra.id).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("compra Eliminada", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;

    }
  }
  public UpdateStock(model: ComprasModel) {

  }


}