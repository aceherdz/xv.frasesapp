import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RandomFraseComponent } from './coomponents/random-frase/random-frase.component';
import { MenuComponent } from './coomponents/menu/menu.component';
import { AddFraseComponent } from './coomponents/add-frase/add-frase.component';
import { ManRepoComponent } from './coomponents/man-repo/man-repo.component';

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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
