import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackManagerService {

  constructor(public snackBar: MatSnackBar) { }

  public openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(SnackBarComponent,{
      data: {message:message, typeAction:action},
      duration:2000
    });
    // this.snackBar.open(message, action, {
    //   duration: 2000,
    //   panelClass: [className]
    // });
  }
}
