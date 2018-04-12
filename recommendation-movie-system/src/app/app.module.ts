import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyDatePickerModule } from 'mydatepicker';
import { JwtHelper } from 'angular2-jwt';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';

import { AppConfig } from './config/app.config';
import { ApiRequestService } from './services/api-request.service';
import { ApiHeaderRequestService } from './services/api-header-request.service'
import { TestService } from './services/test.service';
import { PaginationService } from './services/pagination.service';
import { AuthenticationService } from './services/authentication.service'
import { MovieService } from './services/movie.service';
import { ReviewService } from './services/review.service';
import { HistoryService } from './services/history.service';
import { CountryService } from './services/country.service';
import { CategoryService } from './services/category.service';
import { UserService } from './services/user.service';
import { UserCanActive } from "./services/authentication.service";

import { ContactComponent } from './pages/contact/contact.component';
import {AppRoutingModule } from './app.router';
import { HomeComponent } from './pages/home/home.component';
import { TemplateComponent } from './pages/template/template.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ReviewComponent } from './pages/review/review.component';
import { SearchComponent } from './pages/search/search.component';
import { PhimMoiComponent } from './pages/phim-moi/phim-moi.component';
import { PhimLeComponent } from './pages/phim-le/phim-le.component';
import { PhimBoComponent } from './pages/phim-bo/phim-bo.component';
import { TopImdbComponent } from './pages/top-imdb/top-imdb.component';
import { DetailReviewComponent } from './pages/review/detail-review/detail-review.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomeComponent,
    TemplateComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    SignupComponent,
    ReviewComponent,
    SearchComponent,
    PhimMoiComponent,
    PhimLeComponent,
    PhimBoComponent,
    TopImdbComponent,
    DetailReviewComponent
  ],
  // add Module
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(
      {
        timeOut: 6000,
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
    PaginationService,
    ApiHeaderRequestService,
    AuthenticationService,
    MovieService,
    UserService,
    CategoryService,
    CountryService,
    ReviewService,
    HistoryService,
    UserCanActive,
  ],
  //add Component
  bootstrap: [AppComponent]
})

export class AppModule { }
