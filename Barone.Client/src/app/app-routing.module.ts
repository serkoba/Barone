import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AdminclientsComponent, AdminusersComponent, AdminbarrilesComponent, AdminrangosComponent, AdminpedidosComponent, AdminentregasComponent, AdminpagosComponent, AdminestilosComponent, BarrilEstadoReporteComponent } from './modules/modules.export';
import { TestComponent } from './modules/reportes/components/test/test.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Users', component: AdminusersComponent },
  { path: 'Clients', component: AdminclientsComponent },
  { path: 'Barriles', component: AdminbarrilesComponent },
  { path: 'Rangos', component: AdminrangosComponent },
  { path: 'Estilos', component: AdminestilosComponent },
  { path: 'Pedidos', component: AdminpedidosComponent },
  { path: 'Entregas', component: AdminentregasComponent },
  { path: 'Pagos', component: AdminpagosComponent },
  { path: 'logoff', component: LoginComponent },
  { path: 'test', component: TestComponent },
  { path: 'BarrilesEstado', component: BarrilEstadoReporteComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
