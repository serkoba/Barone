import { Component, OnInit, Input } from '@angular/core';
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
  @Input() public TipoReporte:string;
  columns: any[] = [
    {
      display: 'Estado',
      variable: 'Estado',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    },
    {
      display: 'TotalBarriles',
      variable: 'TotalBarriles',
      filter: 'text',
      template: 'text',
      Sumarizable:false
    }]
  constructor(public barrilServices: BarrilesService) { }

  ngOnInit() {
    this.loadBarriles();
  }

  public loadBarriles(): void {
    this.barriles = [];
    let barrilesQuery = this.TipoReporte==='Estado'?this.barrilServices.getBarrilesAgrupados():this.barrilServices.getBarrilesAgrupadosByEstilos();
    barrilesQuery
      .subscribe(barriles => {
        this.barriles = barriles;
      });

  }

}
