import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from "@angular/router";

import { UserCanActive } from './services/authentication.service';
import { AppComponent } from './app.component';
import { AppCustomPreload } from './app.routing.loader';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { TemplateComponent } from './pages/template/template.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ReviewComponent } from './pages/review/review.component';
import { SearchComponent } from './pages/search/search.component';
import { PhimMoiComponent } from './pages/phim-moi/phim-moi.component';
import { PhimLeComponent } from './pages/phim-le/phim-le.component';
import { PhimBoComponent } from './pages/phim-bo/phim-bo.component';
import { TopImdbComponent } from './pages/top-imdb/top-imdb.component';
import { DetailReviewComponent } from './pages/review/detail-review/detail-review.component';

const appRouter: Routes = [
    {
        path: 'login',
        children: [
            {
                path: '',
                component: LoginComponent,
            },
        ]
    },
    {
        path: 'template',
        component: TemplateComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: 'search',
        component: SearchComponent,
    },
    {
        path: 'search/:text',
        component: SearchComponent,
    },
    {
        path: 'the_loai/:category',
        component: PhimBoComponent,
    },
    {
        path: 'history',
        component: PhimLeComponent,
    },
    {
        path: 'phim/:engTitle',
        component: DetailReviewComponent,
    },
    {
        path: 'top-imdb',
        component: TopImdbComponent,
    },


    // cant Active
    {
        path: '',
        canActivate: [UserCanActive],
        children: [
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            },
            {
                path: 'contact',
                component: ContactComponent,
            },
            {
                path: 'review',
                component: ReviewComponent,
            },
            // {
            //     path: 'review/:engTitle',
            //     component: DetailReviewComponent,
            // },
        ]
    }
];

@NgModule({
    // imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: false})],
    imports: [RouterModule.forRoot(appRouter)],
    exports: [RouterModule],
    providers: [AppCustomPreload]
})

export class AppRoutingModule {
}
