import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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


const firebaseConfig = {
  apiKey: 'AIzaSyCvD4cQ6tVfuU0uihhgxniUC-DCMFQBfIs',
  authDomain: 'tpr-quiz.firebaseapp.com',
  projectId: 'tpr-quiz',
  storageBucket: 'tpr-quiz.appspot.com',
  messagingSenderId: '284856723267',
  appId: '1:284856723267:web:459c997606649b777db1f6'
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
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
