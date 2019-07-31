import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '../../models/nav-item';
import { isNullOrUndefined } from 'util';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    trigger('visibleSidebarState', [
      state('expanded', style({ transform: 'none', pointerEvents: 'auto', willChange: 'initial' })),
      state('expanded--animate', style({ transform: 'none', pointerEvents: 'auto', willChange: 'initial' })),
      state('collapsed--left', style({ transform: 'translateX(-110%)' })),
      state('collapsed--right', style({ transform: 'translateX(110%)' })),
      state('collapsed--top', style({ transform: 'translateY(-110%)' })),
      state('collapsed--bottom', style({ transform: 'translateY(110%)' })),
      transition('expanded--animate <=> *', animate('0.3s cubic-bezier(0, 0, 0.3, 1)'))
    ])],
  providers:[NgbCollapse]
})
export class NavBarComponent implements OnInit {

  @ViewChild("wrapper") public divMain: ElementRef;
  @ViewChild("buttonHamburger") public buttonHamburger: ElementRef;
  @ViewChild("overlay") public overlay: ElementRef;
  
  private _mappedNavigation: NavItem[] = [];
  public activeLinkIndex;
  /**
   * logo of the application
   */
  @Input() public logo: NavItem;
  /**
   * set element that have the nav tool
   */
  @Input() public navigation: NavItem[];
  @Input() public RoleUser:string[];
  public navigations: NavItem[];
  /**
   * this is a button that shows a dropdown with different actions
   */
  // @Input() public actionButtons: NavItem[];
  // public actionButtons2: NavItem[];
  /**
   * true or false that allows hide the nav bar
   */
  @Input() public hideNav: boolean;
  /**
   * event fired when you click in an option
   */
  @Output() public navItemClick: EventEmitter<string> = new EventEmitter();
  public ClassesToToggle = ['show','collapsed'];
  public collapsed = false;

  constructor(private _router: Router) { 
    //this.config.closeOthers = true;
   // this.config.type = 'info';
  }
  

  ngOnInit() {
    this.navigations=this.navigation;
   // this.actionButtons2=this.actionButtons;
    // this._router.events.subscribe((res) => {
    //   this.activeLinkIndex = this.getCurrentActiveLink();
    // });


    // var screenHeight = window.outerHeight;
    // var screenWidth = window.outerWidth;
    // var navHeight = document.getElementById("main-nav").offsetHeight;
    // var contentHeight = screenHeight - navHeight;

  }
  public toggle(element: string, itemLink:string){
  //  this.resetNav();
    let _destinationElement = document.getElementById(element);
    let _itemLink= document.getElementById(itemLink);
    _destinationElement.classList.toggle('show');
    _itemLink.classList.toggle('collapsed');
// this.divMain.nativeElement.classList.add('toggled');
// this.buttonHamburger.nativeElement.classList.remove('is-closed');
// this.buttonHamburger.nativeElement.classList.add('is-open');
// this.overlay.nativeElement.show();
  }
  public accordionEnabled(element:string){
    let _destinationElement = document.getElementById(element);
   // let isToggled=_destinationElement.classList.contains('toggled');
    _destinationElement.classList.toggle('toggled');
   
   
  }
  public resetNav(){
    this.ClassesToToggle.forEach(className => {
      let _elements = Array.from(document.getElementsByClassName(className));
      _elements.forEach(element=>{
        element.classList.toggle(className);
      })

    })
  }

  public openNav() {
    if (document.getElementById("hamburger").classList.contains("is-active")){
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("container").style.marginLeft = "0";
      document.getElementById("hamburger").classList.remove("is-active");
    }
    else
    {
      document.getElementById("mySidenav").style.width = "250px";
      document.getElementById("container").style.marginLeft = "250px";
      document.getElementById("hamburger").classList.add("is-active");  //.add('is-open');
    }
}








  /**
   * Get navigation
   */
  public getNavigation() {
    // if (!isNullOrUndefined(this.navigation) && (
    //   this._mappedNavigation.length === 0 ||
    //   this._mappedNavigation.length !== this.navigation.length ||
    //   !this._mappedNavigation.every(nav => this.navigation.find(item => item.routerPath === nav.routerPath) !== undefined))) {
    //   this._mappedNavigation = (this.navigation || []).map(navigation => new NavItem({
    //     text: navigation.text,
    //     routerPath: navigation.routerPath
    //   }));
    // }

    // return this._mappedNavigation;
    return this.navigation;
  }

  /**
   * Event handler to handle buttonClick event
   * @param name
   */
  public buttonClicked(name: string) {
    this.navItemClick.emit(name);
  }

  private getCurrentActiveLink() {
    let _activeLink = 0;
    let currentMainRoute: string;
    const pathNames = !(window.location.hash === '') ? window.location.hash.split('/') : window.location.pathname.split('/');
    const positionRoot = pathNames.indexOf('www');
    if (positionRoot < 0) {

      if (pathNames.length > 1) {
        currentMainRoute = pathNames[1].toLowerCase();
      }
    } else {
      currentMainRoute = pathNames[positionRoot + 1].toLowerCase();
    }
    _activeLink = this._mappedNavigation.indexOf(
      this._mappedNavigation.find(tab => tab.text.toLowerCase() === (currentMainRoute)));
    return _activeLink;
  }

}
