import { Component, OnInit, Input } from '@angular/core';
import { ReporteAgrupado } from 'src/app/modules/shared/models/reporte-agrupado.model';

@Component({
  selector: 'box-dashboard',
  templateUrl: './box-dashboard.component.html',
  styleUrls: ['./box-dashboard.component.scss']
})
export class BoxDashboardComponent implements OnInit {
  @Input() public data: ReporteAgrupado[]=[];
  constructor() { }

  ngOnInit() {
  }

}
