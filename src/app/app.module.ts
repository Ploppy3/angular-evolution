import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IvyComponent } from './ivy/ivy.component';
import { CategoryComponent } from './category/category.component';
import { ImplementationComponent } from './implementation/implementation.component';
import { MarkupPipe } from './markup.pipe';

@NgModule({
  declarations: [
    AppComponent,
    IvyComponent,
    CategoryComponent,
    ImplementationComponent,
    MarkupPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
