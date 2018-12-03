import { Component, OnInit, ViewChild } from '@angular/core';
import { RecetaModel } from 'src/app/modules/shared/models/receta/receta.model';
import { DBOperation } from 'src/app/core/enum/enum.enum';
import { GridComponent, SnackManagerService } from 'src/app/core/core.module.export';
import { RecetasService } from '../../services/recetas.service';
import { MatDialog } from '@angular/material';
import { EditRecetaComponent } from '../edit-receta/edit-receta.component';

@Component({
  selector: 'app-adminrecetas',
  templateUrl: './adminrecetas.component.html',
  styleUrls: ['./adminrecetas.component.scss']
})
export class AdminrecetasComponent implements OnInit {
  recetas: RecetaModel[];
  isREADONLY: boolean = false;
  exportFileName: string = "clients_";
  dbops: DBOperation;
  msg: string;
  modalTitle: string;
  modalBtnTitle: string;
  receta: RecetaModel;
  hdrbtns: any[] = [];
  gridbtns: any[] = [];
  @ViewChild('grid') public grid: GridComponent;
  columns: any[] = [
    {
      display: 'Fecha',
      variable: 'Fecha',
      filter: 'date',
      template: 'text'
    },
    {
      display: 'Nombre',
      variable: 'Nombre',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'IBU',
      variable: 'IBU',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Tiempo Empaste',
      variable: 'TiempoEmpaste',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Litros',
      variable: 'LitrosTotales',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'PH',
      variable: 'PH',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Acciones',
      variable: 'acciones',
      filter: 'text',
      template: 'acciones'
    }

  ];
  sorting: any = {
    column: 'Nombre',
    descending: false
  };

  public initGridButton() {

    this.hdrbtns = [
      {
        title: 'Nueva Receta',
        keys: [''],
        action: DBOperation.create,
        ishide: this.isREADONLY

      }];
    this.gridbtns = [
      {
        title: 'Editar',
        icon: 'create',
        keys: ['id'],
        action: DBOperation.update,
        ishide: this.isREADONLY
      },
      {
        title: 'Borrar',
        icon: 'clear',
        keys: ["id"],
        action: DBOperation.delete,
        ishide: this.isREADONLY
      }

    ];
  }

  constructor(private _snack: SnackManagerService, private recetasServices: RecetasService, private dialog: MatDialog) { }
  openDialog() {
    let dialogRef = this.dialog.open(EditRecetaComponent);
    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.receta = this.receta;

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.LoadRecetas();
        switch (this.dbops) {
          case DBOperation.create:
            this.msg = "Data successfully added.";
            break;
          case DBOperation.update:
            this.msg = "Data successfully updated.";
            break;
          case DBOperation.delete:
            this.msg = "Data successfully deleted.";
            break;
        }
      }
      else if (result == "error")
        this.msg = "There is some issue in saving records, please contact to system administrator!"
      else
        this.msg = result;
    });
  }

  ngOnInit() {
    this.LoadRecetas();

  }
  LoadRecetas(): void {
    this.recetas = [];

    this.recetasServices.getAll()
      .subscribe(recetas => { this.recetas = recetas; this.initGridButton(); });

  }

  addReceta() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Agrega Nueva Receta";
    this.modalBtnTitle = "Guardar";
    this.openDialog();
  }
  EditReceta(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Edit Receta";
    this.modalBtnTitle = "Update";
    this.receta = this.recetas.find(x => x.id === id);
    this.receta.MaltaReceta = JSON.parse(this.receta.Malta);
    this.receta.LupuloReceta = JSON.parse(this.receta.Lupulo);
    this.receta.AguaReceta = JSON.parse(this.receta.Agua);
    this.receta.AdjuntoReceta = JSON.parse(this.receta.Adjunto);
    //   this.userServices.getById(id).then(val => { this.user = Object.assign(new User(), val); this.openDialog(); });;
    this.openDialog();
  }
  DeleteReceta(id: number) {
    this.dbops = DBOperation.delete;
    this.recetasServices.delete(id).subscribe(() => {
      // this.dialogRef.close("success");
      this._snack.openSnackBar("Receta Eliminada", 'Success');
      this.LoadRecetas();
    }, error => {
      this._snack.openSnackBar(error, 'Error');
      //  this.dialogRef.close("error");

    });
  }

  gridaction(gridaction: any): void {

    switch (gridaction.action) {
      case DBOperation.create:
        this.addReceta();
        break;
      case DBOperation.update:
        this.EditReceta(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.DeleteReceta(gridaction.values[0].value);
        break;
    }

  }
}
