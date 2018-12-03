import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.scss']
})
export class TankComponent implements OnInit {
  @Input() public Title: string;
  @Input() public percentage: number;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.ReFillTank();
  }

  public ReFillTank() {
    var cnt = document.getElementById("count");
    var water = document.getElementById("water");
    cnt.innerHTML = this.percentage.toFixed(2);
    this.percentage = this.percentage > 100 ? 100 : this.percentage;
    water.style.transform = 'translate(0' + ',' + (100 - this.percentage).toFixed(2) + '%)';
  }

}
