import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Cards } from './cards/cards';
import { Login } from './login/login';
import { Card } from './card/card';
import { Colections } from './colections/colections';
import { Register } from './register/register';
import { Profile } from './profile/profile';
import { AuthGuard } from './auth.guard/auth.guard'

export const routes: Routes = [
    { path: 'home', component: Homepage},
    { path: 'login', component: Login},
    { path: 'cards', component: Cards },
    { path: 'card/:id', component: Card },
    { path: 'colections', component: Colections, canActivate: [AuthGuard]},
    { path: 'register', component: Register},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'profile', component: Profile, canActivate: [AuthGuard] },
];