import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



import {
    NavBarComponent,
    LoginComponent,
    FrameworkConfigurationService,
    DataGrid,
    OrderBy,
    Format,
    AnimatedIconComponent,
    HttpClientService,
    AuthService,
    SessionDataService,
    CacheService,
    AuthenticationInterceptorService
} from './core.module.export';
import { ClassTogglerDirective } from './directives/class-toggler.directive';
import { SearchComponent } from './components/search/search.component';
import { MatMenuModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatDatepickerModule, MatAutocompleteModule, MatInputModule, MatSelectModule, MatRadioModule, MatNativeDateModule, MatAccordion, MatExpansionModule, MatToolbarModule, MatListModule, MatSidenavModule, MatGridListModule, MatFormFieldModule, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SnackManagerService } from './services/snack-manager.service';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { AutocompleteInputComponent } from './components/autocomplete-input/autocomplete-input.component';



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
     MatSnackBarModule
  ],
  declarations: [
    NavBarComponent,
    LoginComponent,
    DataGrid,
    ClassTogglerDirective,
    SearchComponent,
    OrderBy,
    Format,
    AnimatedIconComponent,
    ButtonGroupComponent,
    SnackBarComponent,
    AutocompleteInputComponent
   ],
  exports: [
    LoginComponent,
    NavBarComponent,
    SearchComponent,
    AnimatedIconComponent,
    DataGrid,MatDatepickerModule,
    ButtonGroupComponent,
    SnackBarComponent,
    AutocompleteInputComponent
    ],
    entryComponents: [SnackBarComponent]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [FrameworkConfigurationService, AuthService,SnackManagerService,
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
          },]
    };
  }
}
