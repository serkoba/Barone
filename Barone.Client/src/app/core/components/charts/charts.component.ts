import { Component, OnInit, Input } from '@angular/core';
import { ChartsModule, Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  @Input() public ChartOptions: ChartOptions = {
    responsive: true,
    
  };
  @Input() public ChartLabels: Label[] 
  @Input() public ChartType: ChartType = 'pie';
  public ChartLegend = true;
  public ChartPlugins = [pluginDataLabels];

  @Input() public ChartData: number[];

   @Input() public ChartDataSets: ChartDataSets[];

 @Input() public ChartColors = [
  ];
  @Input() public ShowChart:boolean=false;

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
