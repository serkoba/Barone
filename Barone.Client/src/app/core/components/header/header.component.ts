import { Component, OnInit, Input } from '@angular/core';
import { NavItem } from '../../models/nav-item';
import { SessionDataService } from '../../services/session-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() public actionButtons: NavItem[];
  constructor(public session:SessionDataService) { }

  ngOnInit() {
    console.log(this.actionButtons);
  }
  public getUserName():string{
    return this.session.getValue('userName');
  }

}
