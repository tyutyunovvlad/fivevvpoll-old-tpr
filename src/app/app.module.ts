import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CreateDialogComponent } from './pages/home/components/create-dialog/create-dialog.component';
import { ConnectDialogComponent } from './pages/home/components/connect-dialog/connect-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ConnectErrorComponent } from './shared/errors/connect-error/connect-error.component';
import { CreateErrorComponent } from './shared/errors/create-error/create-error.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { registerLocaleData } from '@angular/common';
import localeUa from '@angular/common/locales/uk';
import { CopiedComponent } from './shared/errors/copied/copied.component';
import { AlternativesComponent } from './shared/errors/alternatives/alternatives.component';

registerLocaleData(localeUa, 'ua');


const firebaseConfig = {
  apiKey: 'AIzaSyCvD4cQ6tVfuU0uihhgxniUC-DCMFQBfIs',
  authDomain: 'tpr-quiz.firebaseapp.com',
  projectId: 'tpr-quiz',
  storageBucket: 'tpr-quiz.appspot.com',
  messagingSenderId: '284856723267',
  appId: '1:284856723267:web:459c997606649b777db1f6'
  // apiKey: "AIzaSyAm1APdRt9H3n0BvMpUw0JbpGPsD9wcd9I",
  // authDomain: "fivevvpoll.firebaseapp.com",
  // projectId: "fivevvpoll",
  // storageBucket: "fivevvpoll.appspot.com",
  // messagingSenderId: "317894793893",
  // appId: "1:317894793893:web:992fbf0297b6423bfc4b4c"
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CreateDialogComponent,
    ConnectDialogComponent,
    ConnectErrorComponent,
    CreateErrorComponent,
    CopiedComponent,
    AlternativesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),

    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'ua'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
