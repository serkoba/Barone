import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from './modules/users/components/edit-user/edit-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule, MatIconModule } from '@angular/material';
import { ModulesModule } from './modules/modules.module';
import { HttpClientModule } from '@angular/common/http';
import { APP_ROUTES } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTES,
    FormsModule,
    MatRadioModule,
    MatIconModule,
    NgbModule.forRoot(),
    CoreModule.forRoot(),
    ModulesModule.forRoot()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [EditUserComponent]
})
export class AppModule { }
