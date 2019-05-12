import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import {
  AdminclientsComponent,
  AdminusersComponent,
  AdminbarrilesComponent,
  AdminrangosComponent,
  AdminpedidosComponent,
  AdminentregasComponent,
  AdminpagosComponent,
  AdminestilosComponent,
  BarrilEstadoReporteComponent,
  BarrilesTotalesComponent,
  EntregasReportesComponent,
  PedidosReportesComponent,
  EntregaAgrupadosComponent,
  EstadoCuentaReporteComponent,
  AdminfermentadorComponent,
  AdminproveedoresComponent,
  AdmininsumosComponent,
  AdmincomprasComponent,
  AdminrecetasComponent,
  AdmincoccionesComponent,
  CalendarCoccionComponent,
  MainDashboardComponent
} from './modules/modules.export';
import { TestComponent } from './modules/reportes/components/test/test.component';
import { AuthGuardService } from './core/core.module.export';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [

      { path: 'Users', component: AdminusersComponent },
      // { path: 'Clients', component: AdminclientsComponent },
      // { path: 'Barriles', component: AdminbarrilesComponent },
      { path: 'Rangos', component: AdminrangosComponent },
      { path: 'Estilos', component: AdminestilosComponent },
      { path: 'Pedidos', component: AdminpedidosComponent },
      // { path: 'Entregas', component: AdminentregasComponent },
      { path: 'Pagos', component: AdminpagosComponent },
      { path: 'Fermentador', component: AdminfermentadorComponent },
      { path: 'test', component: TestComponent },
      { path: 'BarrilesEstado', component: BarrilEstadoReporteComponent },
      { path: 'BarrilesAgrupados', component: BarrilesTotalesComponent },
      { path: 'EntregaReportes', component: EntregasReportesComponent },
      { path: 'PedidoReportes', component: PedidosReportesComponent },
      { path: 'EntregasAgrupados', component: EntregaAgrupadosComponent },
      { path: 'EstadoCuenta', component: EstadoCuentaReporteComponent },
      { path: 'Proveedores', component: AdminproveedoresComponent },
      { path: 'Insumos', component: AdmininsumosComponent },
      { path: 'Compras', component: AdmincomprasComponent },
      { path: 'Recetas', component: AdminrecetasComponent },
      { path: 'Cocciones', component: AdmincoccionesComponent },
      { path: 'CalendarCocciones', component: CalendarCoccionComponent }]
  },
  { path: 'login', component: LoginComponent },
  { path: 'logoff', component: LoginComponent },
  { path: 'Clients', component: AdminclientsComponent },
  { path: 'Barriles', component: AdminbarrilesComponent },
  { path: 'Entregas', component: AdminentregasComponent },
  { path: 'CalendarCocciones', component: CalendarCoccionComponent },
  {path:'Dashboard', component: MainDashboardComponent}

];
// @NgModule({
//   imports: [RouterModule.forRoot(routes),
//     CommonModule
//   ],
//   exports: [RouterModule],
//   declarations: []
// })
// export class AppRoutingModule { }
export const APP_ROUTES = RouterModule.forRoot(routes, {useHash:true});