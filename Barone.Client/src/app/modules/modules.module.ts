import { ModuleWithProviders, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  MatMenuModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule,
  MatDatepickerModule, MatAutocompleteModule, MatInputModule, MatSelectModule,
  MatRadioModule, MatNativeDateModule, MatChipsModule, MatSidenavModule, MatBadgeModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  UserService, AdminusersComponent, EditUserComponent, ClientPipe, ClientsService,
  UserPipe, AdminclientsComponent, EditClientsComponent, AdminbarrilesComponent, EditBarrilesComponent,
  BarrilPipe, BarrilesService,
  RangoPipe, RangosService, EditRangosComponent, AdminrangosComponent, BarrilesEstadoComponent, BarrilesEstiloComponent,
  EditPedidosComponent,
  AdminpedidosComponent,
  AdminentregasComponent,
  EditEntregasComponent,
  EntregasPipe,
  PedidosService,
  PedidosPipe,
  PagosService,
  PagosPipe,
  EditPagosComponent,
  AdminpagosComponent,
  EntregasService,
  EstilosService
} from './modules.export';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../core/core.module';
import { AdminestilosComponent } from './estilos/components/adminestilos/adminestilos.component';
import { EditEstilosComponent } from './estilos/components/edit-estilos/edit-estilos.component';
import { EstilosPipe } from './shared/filters/estilos.pipe';
import { AddEntregaComponent } from './entregas/components/add-entrega/add-entrega.component';




/**
 * This exposes all UI Components related to the Core UI functionality of Modules.
 */
@NgModule({
  imports: [
    CoreModule,
    NgbModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule, MatDatepickerModule, MatButtonModule,
    MatAutocompleteModule, MatInputModule, MatSelectModule, MatMenuModule, MatIconModule, MatRadioModule,
    ReactiveFormsModule, MatNativeDateModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatBadgeModule
  ],
  declarations: [
    EditUserComponent,
    AdminusersComponent,
    UserPipe,
    AdminclientsComponent,
    EditClientsComponent,
    ClientPipe,
    AdminbarrilesComponent,
    EditBarrilesComponent,
    BarrilPipe,
    AdminrangosComponent,
    EditRangosComponent,
    RangoPipe,
    BarrilesEstadoComponent,
    BarrilesEstadoComponent,
    BarrilesEstiloComponent,
    EditPedidosComponent,
    AdminpedidosComponent,
    PedidosPipe,
    AdminentregasComponent,
    EditEntregasComponent,
    EntregasPipe,
    AdminpagosComponent,
    EditPagosComponent,
    PagosPipe,
    AdminestilosComponent,
    EditEstilosComponent,
    EstilosPipe,
    AddEntregaComponent
  ],
  exports: [
    EditUserComponent,
    AdminusersComponent,
    UserPipe,
    AdminbarrilesComponent,
    EditBarrilesComponent,
    AdminclientsComponent,
    EditClientsComponent,
    AdminrangosComponent,
    EditRangosComponent,
    BarrilesEstadoComponent,
    BarrilesEstiloComponent,
    EditPedidosComponent,
    AdminpedidosComponent,
    AdminentregasComponent,
    EditEntregasComponent,
    AdminpagosComponent,
    EditPagosComponent,
    AdminestilosComponent,
    EditEstilosComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [EditUserComponent, EditClientsComponent, EditBarrilesComponent, EditRangosComponent, EditPagosComponent,
    BarrilesEstadoComponent, BarrilesEstiloComponent,
    EditPedidosComponent,
    EditEntregasComponent,
    EditEstilosComponent,
    AddEntregaComponent],
  providers: [UserPipe, UserService, ClientsService, ClientPipe, BarrilPipe,
    BarrilesService, RangosService, RangoPipe, PedidosService,
    PedidosPipe,
    EntregasService,
    EntregasPipe,
    PagosPipe,
    PagosService,
    EstilosService,
    EstilosPipe]
})
export class ModulesModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ModulesModule,
      providers: [UserService, ClientsService, BarrilesService, RangosService, PedidosService, PagosService, EstilosService]
    };
  }
}
