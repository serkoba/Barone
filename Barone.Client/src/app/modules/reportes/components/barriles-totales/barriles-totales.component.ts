import { Component, OnInit } from '@angular/core';
import { BarrilModel } from 'src/app/modules/shared/models/barril.model';
import { BarrilesService } from 'src/app/modules/barriles/services/barriles.service';
import { ReporteAgrupado } from 'src/app/modules/shared/models/reporte-agrupado.model';


@Component({
  selector: 'app-barriles-totales',
  templateUrl: './barriles-totales.component.html',
  styleUrls: ['./barriles-totales.component.scss']
})
export class BarrilesTotalesComponent implements OnInit {
  gridbtns: any[] = [];
  hdrbtns: any[] = [];
  barriles: ReporteAgrupado[];
  columns: any[] = [
    {
      display: 'Estado',
      variable: 'Estado',
      filter: 'text',
      template: 'text'
    },
    {
      display: 'TotalBarriles',
      variable: 'TotalBarriles',
      filter: 'text',
      template: 'text'
    }]
  constructor(public barrilServices: BarrilesService) { }

  ngOnInit() {
    this.loadBarriles();
  }

  public loadBarriles(): void {
    this.barriles = [];
    this.barrilServices.getBarrilesAgrupados()
      .subscribe(barriles => {
        this.barriles = barriles;
      });

  }

}
