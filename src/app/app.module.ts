import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PublockPaneComponent } from './publock-pane/publock-pane.component';
import { MenuPaneComponent } from './menu-pane/menu-pane.component';


@NgModule({
  declarations: [
    AppComponent,
    PublockPaneComponent,
    MenuPaneComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
