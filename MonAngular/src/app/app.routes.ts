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
