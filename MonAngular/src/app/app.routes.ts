
import { Routes } from '@angular/router';
import { CategoriesComponent } from './Components/Categories/categories.component';



export const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: '', redirectTo: 'categories', pathMatch: 'full' }
];