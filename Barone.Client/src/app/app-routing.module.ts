import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AdminclientsComponent, AdminusersComponent, AdminbarrilesComponent, AdminrangosComponent, AdminpedidosComponent, AdminentregasComponent, AdminpagosComponent, AdminestilosComponent, BarrilEstadoReporteComponent } from './modules/modules.export';
import { TestComponent } from './modules/reportes/components/test/test.component';
import { AuthGuardService } from './core/core.module.export';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [

      { path: 'Users', component: AdminusersComponent },
      { path: 'Clients', component: AdminclientsComponent },
      { path: 'Barriles', component: AdminbarrilesComponent },
      { path: 'Rangos', component: AdminrangosComponent },
      { path: 'Estilos', component: AdminestilosComponent },
      { path: 'Pedidos', component: AdminpedidosComponent },
      { path: 'Entregas', component: AdminentregasComponent },
      { path: 'Pagos', component: AdminpagosComponent },
      { path: 'test', component: TestComponent },
      { path: 'BarrilesEstado', component: BarrilEstadoReporteComponent }]
  },
  { path: 'login', component: LoginComponent },
  { path: 'logoff', component: LoginComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
