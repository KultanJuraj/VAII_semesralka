import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Cards } from './cards/cards';
import { Login } from './login/login';
import { Card } from './card/card';
import { Colections } from './colections/colections';
import { Register } from './register/register';
import { Profile } from './profile/profile';
import { AuthGuard } from './auth.guard/auth.guard'
import { CollectionForm } from './collection-form/collection-form';
import { Collection } from './collection/collection';
import { EditCollection } from './edit-collection/edit-collection';
import { CardBrowser } from './card-browser/card-browser';
import { PublicCollections } from './public-collections/public-collections';
import { PublicCollectionView } from './public-collection-view/public-collection-view';
import { Users } from './users/users';

export const routes: Routes = [
    { path: 'home', component: Homepage},
    { path: 'login', component: Login},
    { path: 'cards', component: Cards },
    { path: 'card/:id', component: Card },
    { path: 'collections', component: Colections, canActivate: [AuthGuard]},
    { path: 'register', component: Register},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'profile', component: Profile, canActivate: [AuthGuard] },
    { path: 'collection-form', component: CollectionForm, canActivate: [AuthGuard]},
    { path: 'collection/:id', component:Collection, canActivate: [AuthGuard]},
    { path: 'edit-collection/:id',  component:EditCollection, canActivate: [AuthGuard]},
    { path: 'card-browser/:id', component:CardBrowser, canActivate: [AuthGuard]},
    { path: 'public-collections', component: PublicCollections},
    { path: 'public-collection-view/:id', component: PublicCollectionView },
    { path: 'users', component: Users }
];