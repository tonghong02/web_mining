import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';

import { AppConfig } from './config/app.config';
import { ApiRequestService } from './services/api-request.service';
import { TestService } from './services/test.service';
import { PaginationService } from './services/pagination.service';
import { ContactComponent } from './pages/contact/contact.component';
import {AppRoutingModule } from './app.router';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomeComponent
  ],
  // add Module
  imports: [
    BrowserModule,
    HttpModule,
    // RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(
      {
        timeOut: 10000,
        positionClass: 'toast-top-center',
        preventDuplicates: true,
      }
    ),
    ModalModule.forRoot(),
  ],
  // add Service
  providers: [
    AppConfig,
    ApiRequestService,
    TestService,
    PaginationService
  ],
  //add Component
  bootstrap: [AppComponent]
})

export class AppModule { }
