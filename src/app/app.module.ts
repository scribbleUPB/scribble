import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMultipleDatesModule } from 'ngx-multiple-dates'; // module import


//material

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderComponent } from './main-hub/header/header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
//
import { HttpClientModule } from '@angular/common/http';

import { InvitationsComponent } from './main-hub/invitations/invitations.component';
import { FirstScreenComponent } from './poll-creation/first-screen/first-screen.component';
import { LoginComponent } from './login/login/login.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { AnswerComponent } from './poll-creation/answer/answer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './poll-creation/edit/edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InvitationsComponent,
    FirstScreenComponent,
    LoginComponent,
    AnswerComponent,
    EditComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    NgxMultipleDatesModule,
    MatCheckboxModule,
    SocialLoginModule,
    HttpClientModule,
    NgbModule



  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              //Id for Skynet
              //'531547908712-jsrg3foj9hh7gm273c22q59c7str88b6.apps.googleusercontent.com'
              //Id for local work
              '531547908712-2q501cu5jaf3re251m9vqcqmccmfsch6.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
