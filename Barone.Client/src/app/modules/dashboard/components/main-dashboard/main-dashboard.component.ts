import { Component, OnInit, ViewChild } from '@angular/core';
import { BarrilesService } from 'src/app/modules/barriles/services/barriles.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { EntregasService } from 'src/app/modules/entregas/services/entregas.service';
import { ReportFilterModel } from 'src/app/modules/shared/models/reporte-filtro.model';
import * as moment from 'moment';
import { ChartsComponent } from 'src/app/core/core.module.export';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  constructor(public barrilServices: BarrilesService, public entregasServices:EntregasService) { }
public data:number[]=[];
public labels:Label[]=[];
public labelsBar:Label[]=[];
public dataBar: ChartDataSets[]=[];

@ViewChild('chartPie') public chartPie: ChartsComponent;
@ViewChild('chartBar') public chartBar: ChartsComponent;
 public pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'top',
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        const label = ctx.chart.data.labels[ctx.dataIndex];
        return label;
      },
    },
  }
};


 public barChartOptions: ChartOptions = {
  responsive: true,
  // We use these empty structures as placeholders for dynamic theming.
  scales: { xAxes: [{}], yAxes: [{}] },
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  }
};

public ChartColors = [
  {
    backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)','rgba(150,0,0,0.3)'],
  },
];
  ngOnInit() {
    this.barrilServices.getBarrilesAgrupados()
      .subscribe(barriles => {
       this.data = barriles.map(x=> {
        this.labels.push(x.Estado);
         return x.TotalBarriles} );
         this.chartPie.ShowChart=this.data.length>0;
      });
      
      let ReportFilter = new ReportFilterModel();
      var date = new Date();
      date.setDate(date.getDate() - 7);
      ReportFilter.FechaHasta=new Date();
      ReportFilter.FechaDesde=date;
      ReportFilter.Estado=0;
      let arrData : any[]=[];
      this.entregasServices.MovimientosXFecha(ReportFilter).subscribe(x=>{
         x.map(x=> {
          this.labelsBar.push(this.convertToDateFormat(x.Fecha));
          
          x.data.map(mov=> {
            let item =arrData.find(x=>this.convertToEstado(mov.label)===x.label);
            if (typeof item!=='undefined' ){
              item.data.push(mov.data);
            }
            else {
              arrData.push({label: this.convertToEstado(mov.label), data:[mov.data]})
            }

           
          });
       
           
      });
      this.dataBar =arrData;
      this.chartBar.ShowChart=this.dataBar.length>0;

  });
  }
  private convertToDateFormat(date:string){
      return  moment(date).format('YYYY-MM-DD');
  }
  private  convertToEstado(idEstado:string):string{
    switch (idEstado) {
      case "1":
          return 'Pendiente'
      case "2":
          return 'En Progreso'
      case "3":
          return 'Entregado'

      default:
          break;
    }
  }
}
