import { Component, OnInit } from '@angular/core';
import { CoccionModel } from 'src/app/modules/shared/models/coccion/coccion.model';
import { DBOperation } from 'src/app/core/enum/enum.enum';

@Component({
  selector: 'app-rendimiento',
  templateUrl: './rendimiento.component.html',
  styleUrls: ['./rendimiento.component.scss']
})
export class RendimientoComponent implements OnInit {
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  coccion: CoccionModel;
  constructor() { }

  ngOnInit() {
    this.coccion._DetalleEmbarrilado.DiasEnTanque
  }

}
