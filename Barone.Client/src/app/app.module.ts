import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from './modules/users/components/edit-user/edit-user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material';
import { ModulesModule } from './modules/modules.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatRadioModule,
    NgbModule.forRoot(),
    CoreModule.forRoot(),
    ModulesModule.forRoot()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [EditUserComponent]
})
export class AppModule { }
