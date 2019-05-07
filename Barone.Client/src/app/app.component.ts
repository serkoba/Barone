import { Component, OnInit } from '@angular/core';
import { NavItem } from './core/models/nav-item';
import { FrameworkConfigurationService } from './core/services/framework-configuration.service';
import { Router } from '@angular/router';
import { SessionDataService } from './core/core.module.export';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { IconsAppServices } from './modules/shared/services/icons-app.services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  public actionButtons: NavItem[] = [];
  title = 'Barone';

  constructor(private session: SessionDataService,
    private _frameworkConfiguration: FrameworkConfigurationService,
    private _router: Router,
    private _IconsAppServices: IconsAppServices) { }

  ngOnInit() {



    this._IconsAppServices.setAllIcons();
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    const buttons = [];
    buttons.push(
      new NavItem({
        text: 'Log-off',
        routerPath: this._frameworkConfiguration.configuration.logoutUrl,
        icon: 'vpn_key',
        kind: 'link'
      }));
    this.actionButtons = [new NavItem({
      icon: 'person_big',
      text: '',
      className: 'text-primary',
      children: buttons
    })];


  }

  public NavItemClicked(routePath: string) {
    this._router.navigateByUrl(routePath);
  }

  public hideNav(): boolean {
    return !this.session.loggedIn();
  }

  public setNodesWithPermission(): NavItem[] {

    // const buttons = [];
    const navNode = [];
    // buttons.push(
    //   new NavItem({
    //     text: 'Log-off',
    //     routerPath: this._frameworkConfiguration.configuration.logoutUrl,
    //     icon: 'fa-sign-out',
    //     kind: 'link'
    //   }));

    navNode.push(new NavItem({
      text: 'Dashboard',
      routerPath: '/Dashboard',
      icon: 'home',
    }));
    navNode.push(new NavItem({
      text: 'Reportes',
      icon: 'assessment',
      //  routerPath:'/Home',
      children: [this.createNavItem('Barriles x estado', '/BarrilesEstado', 'playlist_add_check'),
      this.createNavItem('Barriles Totales', '/BarrilesAgrupados', 'view_carousel'),
      this.createNavItem('Movimientos', '/EntregaReportes', 'cloud'),
      this.createNavItem('Pedidos', '/PedidoReportes', 'shopping_cart'),
      this.createNavItem('Estado de cuenta', '/EntregasAgrupados', 'swap_horiz'),
      this.createNavItem('Movimientos de cuentas', '/EstadoCuenta', 'face')]
    }));
    navNode.push(new NavItem({
      text: 'Produccion',
      icon: 'battery_20',
      //  routerPath:'/Home',
      children: [this.createNavItem('Fermentador', '/Fermentador', 'meeting_room'),
      this.createNavItem('Proveedores', '/Proveedores', 'local_library'),
      this.createNavItem('Insumos', '/Insumos', 'shopping_basket'),
      this.createNavItem('Compras', '/Compras', 'attach_money'),
      this.createNavItem('Recetas', '/Recetas', 'extension'),
      this.createNavItem('Cocciones', '/Cocciones', 'whatshot'),
      this.createNavItem('Calendario', '/CalendarCocciones', 'calendar_today')
      ]
    }));
    navNode.push(new NavItem({
      text: 'Administracion',
      icon: 'chrome_reader_mode',
      //  routerPath:'/Home',
      children: [this.createNavItem('Rangos', '/Rangos', 'insert_invitation'),
      this.createNavItem('Estilos', '/Estilos', 'dvr'),
      this.createNavItem('Barriles', '/Barriles', 'cloud'),
      this.createNavItem('Clientes', '/Clients', 'supervisor_account'),
      this.createNavItem('Pagos', '/Pagos', 'attach_money'),
      this.createNavItem('Usuarios', '/Users', 'contacts')]
    }));

    navNode.push(new NavItem({
      text: 'Pedidos',
      icon: 'shopping_cart',
      //  routerPath:'/Home',
      children: [this.createNavItem('Pedidos', '/Pedidos', 'store'),
      this.createNavItem('Entregas', '/Entregas', 'local_shipping'),
      this.createNavItem('Devoluciones', '/Barriles', 'transfer_within_a_station'),
      this.createNavItem('Estado/Estilo Barriles', '/Barriles', 'wrap_text'),]
    }));

    return navNode;
  }
  public createNavItem(text: string, routerPath: string, icon: string): NavItem {
    return new NavItem({
      text: text,
      routerPath: routerPath,// this._frameworkConfiguration.configuration.logoutUrl,
      icon: icon,
      kind: 'link'
    })
  }

}