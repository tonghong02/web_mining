import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';

import { AppConfig } from './config/app.config';
import { ApiRequestService } from './services/api-request.service';
import { TestService } from './services/test.service';
import { ContactComponent } from './pages/contact/contact.component';
import {AppRoutingModule } from './app.router';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent
  ],
  // add Module
  imports: [
    BrowserModule,
    HttpModule,
    // RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  // add Service
  providers: [
    AppConfig,
    ApiRequestService,
    TestService,
  ],
  //add Component
  bootstrap: [AppComponent]
})

export class AppModule { }
