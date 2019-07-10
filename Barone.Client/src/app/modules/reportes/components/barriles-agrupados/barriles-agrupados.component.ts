import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-barriles-agrupados',
  templateUrl: './barriles-agrupados.component.html',
  styleUrls: ['./barriles-agrupados.component.scss']
})
export class BarrilesAgrupadosComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }
public TipoReporte:string;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.TipoReporte = params['TipoReporte']; // (+) converts string 'id' to a number
    });
  }

}
