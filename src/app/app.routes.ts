import { Routes } from '@angular/router';
import { Home } from './site/home/home';
import { Films } from './site/films/films';
import { About } from './site/about/about';
import { Errors } from './site/errors/errors';
import { ProductGet } from './site/product/product-get/product-get'; 
import { ProductAdd } from './site/product/product-add/product-add';
import { ProductEdit } from './site/product/product-edit/product-edit'; 
import { FilmDetails } from './site/film-details/film-details';

export const routes: Routes = [
{ path:'', component: Home },
{ path:'films', component: Films, children: [
    {
        path: ':id',
        component: FilmDetails
    }
] },
{ path:'about', component: About },

{ path:'product/create', component: ProductAdd },
{ path:'product/edit/:id', component: ProductEdit },
{ path:'product', component: ProductGet },
{ path:'404',component:Errors },
{ path:'**', redirectTo:'/404'}];