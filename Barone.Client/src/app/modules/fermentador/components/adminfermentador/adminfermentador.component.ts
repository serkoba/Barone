import { Component, OnInit } from '@angular/core';
import { DBOperation } from 'src/app/core/enum/enum.enum';
import { FermentadorModel } from 'src/app/modules/shared/models/fermentador.model';
import { SnackManagerService } from 'src/app/core/core.module.export';
import { FermentadorService } from '../../services/fermentador.service';
import { MatDialog } from '@angular/material';
import { EditFermentadorComponent } from '../edit-fermentador/edit-fermentador.component';

@Component({
  selector: 'adminfermentador',
  templateUrl: './adminfermentador.component.html',
  styleUrls: ['./adminfermentador.component.scss']
})
export class AdminfermentadorComponent implements OnInit {
  fermentadores: FermentadorModel[];
  isREADONLY: boolean = false;
  exportFileName: string = "pagos_";
  dbops: DBOperation;
  msg: string;
  modalTitle: string;
  modalBtnTitle: string;
  fermentador: FermentadorModel;
  //Grid Vars start
  columns: any[] = [
    {
      display: 'Identificador',
      variable: 'Identificador',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Capacidad',
      variable: 'Capacidad',
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
    column: 'Identificador',
    descending: false
  };
  hdrbtns: any[] = [];
  gridbtns: any[] = [];
  initGridButton() {

    this.hdrbtns = [
      {
        title: 'Nuevo Fermentador',
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

  constructor(private _snack: SnackManagerService,
    private fermentadorServices: FermentadorService, private dialog: MatDialog) { }
  openDialog() {
    let dialogRef = this.dialog.open(EditFermentadorComponent);
    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.fermentador = this.fermentador;

    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.loadFermentadores();
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
    this.loadFermentadores();

  }
  loadFermentadores(): void {
    this.fermentadores = [];
    this.fermentadorServices.getAll()
      .subscribe(pagos => { this.fermentadores = pagos; this.initGridButton(); });
  }

  addFermentador() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Agrega Nuevo Fermentador";
    this.modalBtnTitle = "Guardar";
    this.openDialog();
  }
  EditFermentador(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Edit Pago";
    this.modalBtnTitle = "Update";
    this.fermentador = this.fermentadores.find(x => x.id === id);

    this.openDialog();
  }
  DeleteFermentador(id: number) {
    this.dbops = DBOperation.delete;
    this.fermentadorServices.delete(id).subscribe(() => {
      this._snack.openSnackBar("Fermentador Eliminado", 'Success');
      this.loadFermentadores();
    }, error => {
      this._snack.openSnackBar(error, 'Error');


    });
  }

  gridaction(gridaction: any): void {

    switch (gridaction.action) {
      case DBOperation.create:
        this.addFermentador();
        break;
      case DBOperation.update:
        this.EditFermentador(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.DeleteFermentador(gridaction.values[0].value);
        break;
    }

  }
}
