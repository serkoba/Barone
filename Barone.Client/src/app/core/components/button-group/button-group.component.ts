import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { ButtonGroup } from '../../models/button-group';


@Component({
  selector: 'button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements OnInit {

  @Input() public buttons: ButtonGroup[];
  @Output() public buttonClicked:EventEmitter<string>= new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  public Clicked(idClicked:string){
    this.buttonClicked.emit(idClicked);
  }

}
