import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { DestructableComponent } from '../../models/destructable-component';

@Component({
  selector: 'bar-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent extends DestructableComponent implements OnInit {
  public loading: boolean;
  public message: string;

  constructor(private _loader: LoaderService) {
    super();
  }
  public ngOnInit() {
    this.disposableSubscriptions.push(this._loader.status
      .subscribe((status: boolean) => this.loading = status));

    this.disposableSubscriptions.push(this._loader.statusMessage
      .subscribe(message => this.message = message));
  }
}
