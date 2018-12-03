import { Component, OnInit, ViewChild } from '@angular/core';
import { DBOperation } from 'src/app/core/enum/enum.enum';
import { CoccionModel } from 'src/app/modules/shared/models/coccion/coccion.model';
import { SelectItem, SnackManagerService, TankComponent } from 'src/app/core/core.module.export';
import { RecetaModel } from 'src/app/modules/shared/models/receta/receta.model';
import { RecetasService } from 'src/app/modules/recetas/services/recetas.service';
import { FermentadorModel } from 'src/app/modules/shared/models/fermentador.model';
import { FermentadorService } from 'src/app/modules/fermentador/services/fermentador.service';
import { CoccionesService } from '../../services/cocciones.service';
import { MatDialogRef } from '@angular/material';
import { concatMap } from 'rxjs/operators';
import { InsumosService } from 'src/app/modules/insumos/services/insumos.service';

@Component({
  selector: 'app-edit-coccion',
  templateUrl: './edit-coccion.component.html',
  styleUrls: ['./edit-coccion.component.scss']
})
export class EditCoccionComponent implements OnInit {
  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  coccion: CoccionModel;

  enabled: boolean;
  removable = true;

  recetas: RecetaModel[] = [];
  recetasItems: SelectItem[] = [];
  SelectedItem: SelectItem;
  fermentadores: FermentadorModel[] = [];
  fermentadoresItems: SelectItem[] = [];
  SelectedFermentador: SelectItem;
  public percentage: number;
  @ViewChild("tank") public tank: TankComponent;
  constructor(
    //   private insumosServices: InsumosService,
    private recetaServices: RecetasService, private fermentadorServices: FermentadorService,
    private coccionServices: CoccionesService,
    private _snack: SnackManagerService,
    public dialogRef: MatDialogRef<EditCoccionComponent>) {
    this.recetaServices.getAll().subscribe(recetas => {
      this.recetas = recetas;
      this.recetasItems = recetas.map(receta => {
        return new SelectItem({
          smallValue: `Litros: ${receta.LitrosTotales.toString()}`,
          viewValue: receta.Nombre,
          value: receta.id
        })
      });
      if (this.dbops == DBOperation.update) {
        this.SelectedItem = this.recetasItems.find(x => x.value === this.coccion.Receta.id);
      }
    })
    this.fermentadorServices.getAll().subscribe(fermentadores => {
      this.fermentadores = fermentadores;
      this.fermentadoresItems = fermentadores.map(fermentador => {
        return new SelectItem({
          smallValue: `Litros: ${fermentador.Capacidad.toString()}`,
          viewValue: fermentador.Identificador,
          value: fermentador.id
        })
      });
      if (this.dbops == DBOperation.update) {
        this.SelectedFermentador = this.fermentadoresItems.find(x => x.value === this.coccion.Fermentador.id);
      }
    })
  }

  public RecalcularLitros(value: any) {
    this.coccion.Multiplicador = value;
    this.percentage = ((this.coccion.Multiplicador * this.coccion.Receta.LitrosTotales) * 100) / this.coccion.Fermentador.Capacidad;


  }

  public itemSelected(id: number) {

    this.coccion.Receta = this.recetas.find(x => x.id === id);
  }
  public fermentadorSelected(id: number) {

    this.coccion.Fermentador = this.fermentadores.find(x => x.id === id);
  }


  ngOnInit() {
    if (typeof (this.coccion) == "undefined")
      this.coccion = new CoccionModel();
    this.percentage = 0;
    //   this.tank.ReFillTank();

  }





  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:
        this.coccion.Estado = 1;
        this.coccionServices.insert(this.coccion)


          .subscribe((result) => {
            this.coccion.id = result.id;
            this.dialogRef.close("success");
            this._snack.openSnackBar("Coccion Creada Exitosamente", 'Success');

          }, error => {
            this._snack.openSnackBar(error, 'Error');
            this.dialogRef.close("error");

          });

        break;
      case DBOperation.update:
        this.coccionServices.update(this.coccion).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Coccion Actualizada", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.delete:

        this.coccionServices.delete(this.coccion.id).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Coccion Eliminada", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;

    }

  }
}