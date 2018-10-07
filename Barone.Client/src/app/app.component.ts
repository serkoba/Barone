import { Component,OnInit } from '@angular/core';
import { NavItem } from './core/models/nav-item';
import { FrameworkConfigurationService } from './core/services/framework-configuration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  public actionButtons:NavItem[]=[];
  title = 'Barone';
  
  constructor(private _frameworkConfiguration:FrameworkConfigurationService, private _router:Router) { }

  ngOnInit() {
    const buttons=[];
    buttons.push(
      new NavItem({
        text: 'Log-off',
        routerPath: this._frameworkConfiguration.configuration.logoutUrl,
        icon: 'vpn_key',
        kind: 'link'
      }));
    this.actionButtons = [new NavItem({
      icon: 'person' ,
      text: '',
      className: 'text-primary' ,
      children: buttons
    })];

      
  }

  public NavItemClicked(routePath:string){
    this._router.navigateByUrl(routePath);
  }

  public hideNav(): boolean {
   //TODO - hacer despues
    return false;
  }

  public setNodesWithPermission():NavItem[]{

    const buttons = [];
const navNode = [];
    buttons.push(
      new NavItem({
        text: 'Log-off',
        routerPath: this._frameworkConfiguration.configuration.logoutUrl,
        icon: 'fa-sign-out',
        kind: 'link'
      }));

navNode.push(new NavItem({
  text:'Dashboard',
  routerPath:'/Dashboard',
  icon:'home',
}));
navNode.push(new NavItem({
  text:'Reportes',
  icon:'assessment',
//  routerPath:'/Home',
  children:[this.createNavItem('Barriles x estado','/BarrilesEstado','cloud'),
  this.createNavItem('Barriles Totales','/BarrilesTotales','cloud'),
  this.createNavItem('Movimientos','/Movimientos','cloud'),
  this.createNavItem('Pedidos','/ReportePedidos','cloud'),
  this.createNavItem('Estado de cuenta','/EstadoCuenta','cloud'),
  this.createNavItem('Movimientos de cuentas','/MovCuenta','cloud')]
}));
navNode.push(new NavItem({
  text:'Administracion',
  icon:'chrome_reader_mode',
//  routerPath:'/Home',
  children:[this.createNavItem('Rangos','/Rangos','insert_invitation'),
  this.createNavItem('Estilos','/Estilos','dvr'),
  this.createNavItem('Barriles','/Barriles','cloud'),
  this.createNavItem('Clientes','/Clients','supervisor_account'),
  this.createNavItem('Pagos','/Pagos','attach_money'),
  this.createNavItem('Usuarios','/Users','contacts')]
}));

navNode.push(new NavItem({
  text:'Pedidos',
  icon:'shopping_cart',
//  routerPath:'/Home',
  children:[this.createNavItem('Pedidos','/Pedidos','store'),
  this.createNavItem('Entregas','/Entregas','local_shipping'),
  this.createNavItem('Devoluciones Barriles','/DevolucionBarriles','transfer_within_a_station'),
  this.createNavItem('Estado/Estilo Barriles','/Barriles','wrap_text'),]
}));

return navNode;
  }
  public createNavItem(text:string,routerPath:string, icon:string):NavItem{
   return new NavItem({
      text: text,
      routerPath:routerPath,// this._frameworkConfiguration.configuration.logoutUrl,
      icon: icon,
      kind: 'link'
    }) 
  }

}