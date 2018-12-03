import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { CoccionesService } from '../../services/cocciones.service';
import { ReportFilterModel } from 'src/app/modules/shared/models/reporte-filtro.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { EditCoccionComponent } from '../edit-coccion/edit-coccion.component';
import { StepperCoccionesComponent } from '../stepper-cocciones/stepper-cocciones.component';
import { CoccionModel } from 'src/app/modules/shared/models/coccion/coccion.model';
import { DBOperation } from 'src/app/core/enum/enum.enum';

@Component({
  selector: 'app-calendar-coccion',
  templateUrl: './calendar-coccion.component.html',
  styleUrls: ['./calendar-coccion.component.scss']
})
export class CalendarCoccionComponent implements OnInit {
  view: string = 'month';
  public colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    green: {
      primary: '#008000',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };
  public events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;
  dbops: DBOperation;
  msg: string;
  modalTitle: string;
  modalBtnTitle: string;

  public coccion: CoccionModel;
  public cocciones: CoccionModel[];
  constructor(private coccionServices: CoccionesService, private dialog: MatDialog) { }

  public openDialog() {
    let dialogRef = null;

    dialogRef = this.dialog.open(StepperCoccionesComponent);

    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.coccion = this.coccion;
    dialogRef.componentInstance.enabled = false;
    dialogRef.afterClosed().subscribe(result => {
      if (result == "success") {
        this.initCalendar();
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
    this.initCalendar();
  }
  public initCalendar() {
    const filter = new ReportFilterModel();
    this.coccionServices.Filtrar(filter).subscribe(cocciones => {
      this.cocciones = cocciones;
      this.events = cocciones.map(coccion => {
        return {
          id: coccion.id,
          start: new Date(coccion.Fecha),
          end: new Date(coccion.FechaFin),
          title: `${coccion.NroLote} - ${this.returnEstado(coccion.Estado)}`,
          color: this.returnColor(coccion.Estado),
          actions: null
        }
      });
    });

  }
  public returnColor(estado: number) {
    switch (estado) {
      case 1:
        return this.colors.red;
      case 2:
        return this.colors.yellow;
      case 3:
        return this.colors.green;


      default:
        return this.colors.red;
    }
  }
  public dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
  handleEvent(action: string, event: CalendarEvent): void {

    this.dbops = DBOperation.IniciarCoccion;
    this.modalTitle = "Editar Coccion";
    this.modalBtnTitle = "Guardar";

    this.coccion = this.cocciones.find(x => x.id === event.id);
    this.coccion._medicionesMash = JSON.parse(this.coccion.MedicionesMash);
    this.coccion._hervor = JSON.parse(this.coccion.Hervor);
    this.coccion._fermentacion = JSON.parse(this.coccion.Fermentacion);
    this.coccion._carbonatacion = JSON.parse(this.coccion.Carbonatacion);
    this.openDialog();

  }

  private returnEstado(EstadoCoccion: number) {
    switch (EstadoCoccion) {
      case 1:
        return 'Pendiente';
      case 2:
        return 'Iniciada';
      case 3:
        return 'Finalizada';

      default:
        break;
    }
  }

}
