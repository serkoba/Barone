import { Component, OnInit } from '@angular/core';
import { NavItem } from './core/models/nav-item';
import { FrameworkConfigurationService } from './core/services/framework-configuration.service';
import { Router } from '@angular/router';
import { SessionDataService } from './core/core.module.export';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  public actionButtons: NavItem[] = [];
  title = 'Barone';

  constructor(private session: SessionDataService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private _frameworkConfiguration: FrameworkConfigurationService,
    private _router: Router) { }

  ngOnInit() {
    this.iconRegistry.addSvgIcon('battery_20',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_battery_20_18px.svg'));
    this.iconRegistry.addSvgIcon('meeting_room',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/baseline-meeting_room-24px.svg'));

    this.iconRegistry.addSvgIcon('vpn_key',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_vpn_key_24px.svg'));
    this.iconRegistry.addSvgIcon('person',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_person_24px.svg'));
    this.iconRegistry.addSvgIcon('home',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_home_24px.svg'));
    this.iconRegistry.addSvgIcon('view_carousel',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_view_carousel_24px.svg'));
    this.iconRegistry.addSvgIcon('shopping_cart',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_shopping_cart_24px.svg'));
    this.iconRegistry.addSvgIcon('swap_horiz',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_swap_horiz_24px.svg'));
    this.iconRegistry.addSvgIcon('face',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_face_24px.svg'));

    this.iconRegistry.addSvgIcon('chrome_reader_mode',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_chrome_reader_mode_24px.svg'));




    this.iconRegistry.addSvgIcon('insert_invitation',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_insert_invitation_24px.svg'));
    this.iconRegistry.addSvgIcon('dvr',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_devices_24px.svg'));
    this.iconRegistry.addSvgIcon('supervisor_account',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_supervisor_account_24px.svg'));
    this.iconRegistry.addSvgIcon('attach_money',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_attach_money_24px.svg'));
    this.iconRegistry.addSvgIcon('contacts',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_contacts_24px.svg'));


    this.iconRegistry.addSvgIcon('store',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_store_24px.svg'));
    this.iconRegistry.addSvgIcon('local_shipping',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_local_shipping_24px.svg'));
    this.iconRegistry.addSvgIcon('transfer_within_a_station',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_transfer_within_a_station_24px.svg'));
    this.iconRegistry.addSvgIcon('wrap_text',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_wrap_text_24px.svg'));

    this.iconRegistry.addSvgIcon('assessment',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_assessment_24px.svg'));
    this.iconRegistry.addSvgIcon('local_library',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_local_library_24px.svg'));

    this.iconRegistry.addSvgIcon('shopping_basket',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_shopping_basket_24px.svg'));
    this.iconRegistry.addSvgIcon('extension',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_extension_24px.svg'));




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
      icon: 'person',
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
        // this.createNavItem('Movimientos de cuentas', '/EstadoCuenta', 'face')
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
      this.createNavItem('Devoluciones Barriles', '/DevolucionBarriles', 'transfer_within_a_station'),
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