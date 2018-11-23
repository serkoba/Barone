import { Component, OnInit } from '@angular/core';
import { CoccionModel } from '../../../shared/models/coccion/coccion.model';
import { DBOperation } from 'src/app/core/enum/enum.enum';
import { SnackManagerService } from 'src/app/core/core.module.export';
import { CoccionesService } from '../../services/cocciones.service';
import { MatDialog } from '@angular/material';
import { EditCoccionComponent } from '../edit-coccion/edit-coccion.component';
import { StepperCoccionesComponent } from '../stepper-cocciones/stepper-cocciones.component';
import { ButtonType } from 'src/app/modules/shared/enum/enums';


@Component({
  selector: 'admincocciones',
  templateUrl: './admincocciones.component.html',
  styleUrls: ['./admincocciones.component.scss']
})
export class AdmincoccionesComponent implements OnInit {
  cocciones: CoccionModel[];
  isREADONLY: boolean = false;
  exportFileName: string = "clients_";
  dbops: DBOperation;
  msg: string;
  modalTitle: string;
  modalBtnTitle: string;
  coccion: CoccionModel;
  enabled: boolean;
  //Grid Vars start
  columns: any[] = [
    {
      display: 'Nro de Lote ',
      variable: 'NroLote',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'Fecha',
      variable: 'Fecha',
      filter: 'date',
      template: 'text'
    },
    {
      display: 'Fermentador',
      variable: 'Fermentador',
      filter: 'Fermentador',
      template: 'text'
    },
    {
      display: 'Receta',
      variable: 'Receta',
      filter: 'Receta',
      template: 'text'
    },
    {
      display: 'Estado',
      variable: 'Estado',
      filter: 'EstadoCoccion',
      template: 'estado'
    },
    {
      display: 'Acciones',
      variable: 'acciones',
      filter: 'text',
      template: 'acciones'
    }
  ];
  sorting: any = {
    column: 'NroLote',
    descending: false
  };
  hdrbtns: any[] = [];
  gridbtns: any[] = [];
  initGridButton() {

    this.hdrbtns = [
      {
        title: 'Nueva Coccion',
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
      },
      {
        title: 'Iniciar Coccion',
        icon: 'play_circle_filled_white',
        keys: ["id"],
        action: DBOperation.IniciarCoccion,
        ishide: this.isREADONLY
      }

    ];
  }

  constructor(private _snack: SnackManagerService,
    private coccionesServices: CoccionesService, private dialog: MatDialog) { }
  public openDialog(tipoDialog = null) {
    let dialogRef = null;
    if (tipoDialog == null)
      dialogRef = this.dialog.open(EditCoccionComponent);
    else
      dialogRef = this.dialog.open(StepperCoccionesComponent);

    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.coccion = this.coccion;
    dialogRef.componentInstance.enabled = this.enabled != undefined ? this.enabled : true;
    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.loadCocciones();
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
    this.loadCocciones();

  }
  loadCocciones(): void {
    this.cocciones = [];

    this.coccionesServices.getAll()
      .subscribe(cocciones => {
        this.cocciones = cocciones;
        this.initGridButton();
      });


  }

  addCoccion() {
    this.dbops = DBOperation.create;
    this.enabled = true;
    this.modalTitle = "Agrega Nueva Coccion";
    this.modalBtnTitle = "Guardar";
    this.openDialog();
  }
  EditCoccion(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Editar Coccion";
    this.modalBtnTitle = "Update";

    this.coccion = this.cocciones.find(x => x.id === id);
    //this.coccion.DetalleEntrega = JSON.parse(this.entrega.DetallePedido.toString());
    //   this.userServices.getById(id).then(val => { this.user = Object.assign(new User(), val); this.openDialog(); });;
    this.openDialog();
    //   this.userServices.getById(id).then(val => { this.user = Object.assign(new User(), val); this.openDialog(); });;
    //   this.openDialog();
  }
  DeleteCoccion(id: number) {
    this.dbops = DBOperation.delete;
    this.coccionesServices.delete(id).subscribe(() => {
      // this.dialogRef.close("success");
      this._snack.openSnackBar("Coccion Eliminado", 'Success');
      this.loadCocciones();
    }, error => {
      this._snack.openSnackBar(error, 'Error');
    });
  }

  iniciarCoccion(id: number) {
    this.dbops = DBOperation.IniciarCoccion;
    this.modalTitle = "Iniciar Coccion";
    this.modalBtnTitle = "Guardar";

    this.coccion = this.cocciones.find(x => x.id === id);
    this.coccion._medicionesMash = JSON.parse(this.coccion.MedicionesMash);
    this.coccion._hervor = JSON.parse(this.coccion.Hervor);
    this.coccion._fermentacion = JSON.parse(this.coccion.Fermentacion);
    this.coccion._carbonatacion = JSON.parse(this.coccion.Carbonatacion);
    //this.coccion.DetalleEntrega = JSON.parse(this.entrega.DetallePedido.toString());
    //   this.userServices.getById(id).then(val => { this.user = Object.assign(new User(), val); this.openDialog(); });;
    this.openDialog(ButtonType.IniciarCoccion);
    //   this.userServices.getById(id).then(val => { this.user = Object.assign(new User(), val); this.openDialog(); });;
    //   this.openDialog();
  }



  gridaction(gridaction: any): void {

    switch (gridaction.action) {
      case DBOperation.create:
        this.addCoccion();
        break;
      case DBOperation.update:
        this.enabled = true;
        this.EditCoccion(gridaction.values[0].value);
        break;
      case DBOperation.delete:
        this.DeleteCoccion(gridaction.values[0].value);
        break;
      case DBOperation.IniciarCoccion:
        this.iniciarCoccion(gridaction.values[0].value);
        break;

    }

  }
}

