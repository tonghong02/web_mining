import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { AppCustomPreload } from './app.routing.loader';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';

const appRouter: Routes = [
    // {
    //     path: 'login',
    //     children: [
    //         {
    //             path: '',
    //             component: LoginComponent,
    //         },
    //         {
    //             path: 'uber',
    //             component: UberComponent,
    //         }
    //     ]
    // },
    {
        path: 'contact',
        component: ContactComponent,
    },
    // cant Active
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
    },
];

@NgModule({
    // imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: false})],
    imports: [RouterModule.forRoot(appRouter)],
    exports: [RouterModule],
    providers: [AppCustomPreload]
})

export class AppRoutingModule {
}
