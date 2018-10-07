import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SnackBarComponent implements OnInit {

  public icon:string;
  public class:string;
  public action:string;
  public message:string;
  
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.action=data.typeAction;
    this.message=data.message;
   }

  ngOnInit() {
    switch (this.action) {
      case 'Success':
        this.icon='check';
        this.class='alert-success';

        break;
        case 'Warning':
        this.icon='warning';
        this.class='alert-warning';
        break;
        case 'Error':
        this.icon='error_outline';
        this.class='alert-danger';
        
        break;
    
      default:
        break;
    }
  }

}
