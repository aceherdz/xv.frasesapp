import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RandomFraseComponent } from './coomponents/random-frase/random-frase.component';
import { MenuComponent } from './coomponents/menu/menu.component';
import { AddFraseComponent } from './coomponents/add-frase/add-frase.component';
import { ManRepoComponent } from './coomponents/man-repo/man-repo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    RandomFraseComponent,
    MenuComponent,
    AddFraseComponent,
    ManRepoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot( {timeOut: 10000,
      positionClass: 'toast-bottom-full-width',
      preventDuplicates: true,})

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
