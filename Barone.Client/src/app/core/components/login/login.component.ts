import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SessionDataService } from '../../services/session-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user:string;
  public password:string;
  constructor(
    private _route:Router,
    private _auth: AuthService,
    private _session: SessionDataService
  ) { }

  ngOnInit() {
    this.user='';
    this.password='';
    this._session.logOff();
  }

  public login(){

    this._auth.login(this.user.trim(), this.password)
    .subscribe(response => {
      if (response.success) {
        
        this._route.navigate(["/Users"]);
      }
    })


  }

}
