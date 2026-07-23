import { Routes } from '@angular/router';
import { CategoriesComponent } from  './Components/Categories/categories.component';
import { LoginComponent } from './Components/Login/login.component';
import { RegisterComponent } from './Components/Login/register.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
/*
path: '' → correspond à l’URL racine de ton application Angular (http://localhost:4200/).

redirectTo: '/login' → dit à Angular : “si quelqu’un arrive sur la racine, redirige‑le automatiquement vers /login”.

pathMatch: 'full' → précise que la correspondance doit être exacte.

Si tu mets 'prefix', Angular redirigerait aussi toutes les URL qui commencent par '' (donc quasiment toutes).

Avec 'full', la redirection ne se fait que si l’URL est strictement vide (juste /).
*/