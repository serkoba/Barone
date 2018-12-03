import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import {
  NavBarComponent,
  LoginComponent,
  FrameworkConfigurationService,
  DataGrid,
  OrderBy,
  Format,
  HttpClientService,
  AuthService,
  SessionDataService,
  CacheService,
  AuthenticationInterceptorService,
  LoaderService,
  LoaderInterceptorService,
  TankComponent
} from './core.module.export';
import { ClassTogglerDirective } from './directives/class-toggler.directive';
import { SearchComponent } from './components/search/search.component';
import {
  MatMenuModule, MatIconModule,
  MatTooltipModule, MatButtonModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatProgressSpinnerModule, MatDatepickerModule, MatAutocompleteModule, MatInputModule, MatSelectModule, MatRadioModule, MatNativeDateModule, MatExpansionModule, MatToolbarModule, MatListModule, MatSidenavModule, MatGridListModule, MatFormFieldModule, MatSnackBarModule, MatChipsModule, MatBadgeModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SnackManagerService } from './services/snack-manager.service';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { AutocompleteInputComponent } from './components/autocomplete-input/autocomplete-input.component';
import { LoaderComponent } from './components/loader/loader.component';
import { GridComponent } from './components/grid/grid.component';




/**
 * This exposes all UI Components related to the Core UI functionality of Hieronymus.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    BrowserAnimationsModule, MatDatepickerModule, MatButtonModule,
    MatAutocompleteModule, MatInputModule, MatSelectModule, MatMenuModule, MatIconModule, MatRadioModule,
    ReactiveFormsModule, MatNativeDateModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatChipsModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
  ],
  declarations: [
    NavBarComponent,
    LoginComponent,
    DataGrid,
    ClassTogglerDirective,
    SearchComponent,
    OrderBy,
    Format,
    ButtonGroupComponent,
    SnackBarComponent,
    AutocompleteInputComponent,
    LoaderComponent,
    GridComponent,
    TankComponent
  ],
  exports: [
    LoginComponent,
    NavBarComponent,
    SearchComponent,
    DataGrid, MatDatepickerModule,
    ButtonGroupComponent,
    SnackBarComponent,
    AutocompleteInputComponent,
    LoaderComponent,
    GridComponent,
    TankComponent
  ],
  entryComponents: [SnackBarComponent]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [FrameworkConfigurationService, AuthService, SnackManagerService,
        LoaderService,
        HttpClientService,
        CacheService,
        {
          provide: SessionDataService,
          useFactory: SessionDataService.factory,
          deps: [CacheService]
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationInterceptorService,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptorService,
          multi: true,
        }]
    };
  }
}
