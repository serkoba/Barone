import { ModuleWithProviders, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {
  MatMenuModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule,
  MatDatepickerModule, MatAutocompleteModule, MatInputModule, MatSelectModule,
  MatRadioModule, MatNativeDateModule, MatChipsModule, MatSidenavModule, MatBadgeModule, MatAccordion, MatExpansionModule,
  MatTableModule,
  MatCheckboxModule,
  MatStepperModule
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
  EstilosService,
  BarrilEstadoReporteComponent,
  AddEntregaComponent,
  TestComponent,
  BarrilesTotalesComponent,
  EntregasReportesComponent,
  PedidosReportesComponent,
  EntregaAgrupadosComponent,
  EstadoCuentaReporteComponent,
  AdminfermentadorComponent,
  EditFermentadorComponent,
  AdminproveedoresComponent,
  EditProveedoresComponent,
  FermentadorService,
  AdmininsumosComponent,
  EditInsumosComponent,
  ProveedoresService,
  InsumosService,
  ComprasService,
  AdmincomprasComponent,
  EditComprasComponent,
  AdminrecetasComponent,
  EditRecetaComponent,
  RecetasService,
  FilterGridComponent,
  IconsAppServices,
  AdmincoccionesComponent,
  EditCoccionComponent,
  CoccionesService,
  gridFillComponent,
  StepperCoccionesComponent,
  CalendarCoccionComponent,
  MainDashboardComponent,
  EntregasXEstiloComponent,
  BarrilesAgrupadosComponent,
  EntregasXEstilosComponent,
  EntregasXClienteComponent,
  StepperCocciones2Component,
  AdminproductosComponent,
  EditProductosComponent,
  ProductosService,
  RendimientoComponent,
  ProductoEstiloComponent
} from './modules.export';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../core/core.module';
import { AdminestilosComponent } from './estilos/components/adminestilos/adminestilos.component';
import { EditEstilosComponent } from './estilos/components/edit-estilos/edit-estilos.component';
import { EstilosPipe } from './shared/filters/estilos.pipe';








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
    MatBadgeModule,
    MatExpansionModule,
    MatTableModule,
    MatCheckboxModule,
    MatStepperModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: adapterFactory
      })
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
    AddEntregaComponent,
    TestComponent,
    BarrilEstadoReporteComponent,
    BarrilesTotalesComponent,
    EntregasReportesComponent,
    PedidosReportesComponent,
    EntregaAgrupadosComponent,
    EstadoCuentaReporteComponent,
    AdminfermentadorComponent,
    EditFermentadorComponent,
    AdminproveedoresComponent,
    EditProveedoresComponent,
    AdmininsumosComponent,
    EditInsumosComponent,
    AdmincomprasComponent,
    EditComprasComponent,
    AdminrecetasComponent,
    EditRecetaComponent,
    FilterGridComponent,
    AdmincoccionesComponent,
    EditCoccionComponent,
    gridFillComponent,
    StepperCoccionesComponent,
    CalendarCoccionComponent,
    MainDashboardComponent,
    EntregasXEstiloComponent,
    BarrilesAgrupadosComponent,
    EntregasXEstilosComponent,
    EntregasXClienteComponent,
    EntregasXClienteComponent,
    StepperCocciones2Component,
    RendimientoComponent,
    AdminproductosComponent,
    EditProductosComponent,
    ProductoEstiloComponent
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
    EditEstilosComponent,
    TestComponent,
    BarrilEstadoReporteComponent,
    BarrilesTotalesComponent,
    EntregasReportesComponent,
    PedidosReportesComponent,
    EntregaAgrupadosComponent,
    EstadoCuentaReporteComponent,
    AdminproveedoresComponent,
    EditProveedoresComponent,
    AdmininsumosComponent,
    EditInsumosComponent,
    AdmincomprasComponent,
    EditComprasComponent,
    AdminrecetasComponent,
    EditRecetaComponent,
    EditCoccionComponent,
    AdmincoccionesComponent,
    gridFillComponent,
    StepperCoccionesComponent,
    CalendarCoccionComponent,
    MainDashboardComponent,
    EntregasXEstiloComponent,
    BarrilesAgrupadosComponent,
    EntregasXEstilosComponent,
    EntregasXClienteComponent,
    StepperCocciones2Component,
    RendimientoComponent,
    AdminproductosComponent,
    EditProductosComponent,
    ProductoEstiloComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [EditUserComponent, EditClientsComponent, EditBarrilesComponent, EditRangosComponent, EditPagosComponent,
    BarrilesEstadoComponent, BarrilesEstiloComponent,
    EditPedidosComponent,
    EditEntregasComponent,
    EditEstilosComponent,
    AddEntregaComponent,
    EditFermentadorComponent,
    EditProveedoresComponent,
    EditInsumosComponent,
    EditComprasComponent,
    EditRecetaComponent,
    EditCoccionComponent,
    StepperCoccionesComponent,
    StepperCocciones2Component,
    RendimientoComponent,
    EditProductosComponent,
    ProductoEstiloComponent],
  providers: [UserPipe, UserService, ClientsService, ClientPipe, BarrilPipe,
    BarrilesService, RangosService, RangoPipe, PedidosService,
    PedidosPipe,
    EntregasService,
    EntregasPipe,
    PagosPipe,
    PagosService,
    EstilosService,
    EstilosPipe,
    FermentadorService,
    ProveedoresService,
    InsumosService,
    ComprasService,
    RecetasService,
    IconsAppServices,
    CoccionesService,
  ProductosService]
})
export class ModulesModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ModulesModule,
      providers: [UserService, ClientsService, BarrilesService, RangosService, PedidosService, PagosService, EstilosService]
    };
  }
}
