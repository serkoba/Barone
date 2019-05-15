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
  @Input() public ChartLabels: Label[] = ['Download', 'Sales'];
  @Input() public ChartType: ChartType = 'pie';
  public ChartLegend = true;
  public ChartPlugins = [pluginDataLabels];

  @Input() public ChartData: number[]=[300, 500, 100];

  @Input() public ChartDataSets: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
   
  ];

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
