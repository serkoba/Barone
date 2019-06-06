import { Component, OnInit, Input } from '@angular/core';
import { NavItem } from '../../models/nav-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() public actionButtons: NavItem[];
  constructor() { }

  ngOnInit() {
    console.log(this.actionButtons);
  }

}
