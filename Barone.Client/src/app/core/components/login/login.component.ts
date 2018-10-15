import { Component, OnInit, ViewChild, ElementRef, TemplateRef, Renderer, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SessionDataService } from '../../services/session-data.service';
import { SnackManagerService } from '../../services/snack-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('txtUser') public txtUser: ElementRef<any>;
  @ViewChild('passowrd') public txtPassword: ElementRef<any>;
  public user: string;
  public password: string;
  constructor(
    private _route: Router,
    private _auth: AuthService,
    private _session: SessionDataService,
    private renderer: Renderer2,
    private _snack: SnackManagerService,

  ) { }

  ngOnInit() {
    this.user = '';
    this.password = '';
    this._session.logOff();
  }
  public change() {

    if (this.txtUser.nativeElement.value.trim() != "") {
      this.renderer.addClass(this.txtUser.nativeElement, 'has-val');

    }
    else {
      this.renderer.removeClass(this.txtUser, 'has-val');
    }
  }
  public changePass() {

    if (this.txtPassword.nativeElement.value.trim() != "") {
      this.renderer.addClass(this.txtPassword.nativeElement, 'has-val');

    }
    else {
      this.renderer.removeClass(this.txtPassword, 'has-val');
    }
  }

  public login() {

    this._auth.login(this.user.trim(), this.password)
      .subscribe(response => {
        if (response.success) {

          this._route.navigate(["/Users"]);
        }

      },
        error => {
          this._snack.openSnackBar("Usuario/Password Invalidos", 'Error');

        })


  }

}
