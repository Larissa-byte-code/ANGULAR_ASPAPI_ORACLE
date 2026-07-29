import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../Models/category.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 // private apiUrl = 'http://localhost:5146/api/categories';
    private apiUrl = `${environment.apiUrl}/api/categories`;
  constructor(private http: HttpClient) {}

  // Récupérer toutes les catégories
  getAll(): Observable<Category[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`).pipe(
      map(data => data.map(item => ({
        catId: item.catId ?? item.CatId,
        catIdvC: item.catIdvC ?? item.CatIdvC,
        catName: item.catName ?? item.CatName,
        catDes: item.catDes ?? item.CatDes
      })))
    );
  }

  // Récupérer une catégorie par ID
  getById(id: number): Observable<Category> {
    return this.http.get<any>(`${this.apiUrl}/get/${id}`).pipe(
      map(item => ({
        catId: item.catId ?? item.CatId,
        catIdvC: item.catIdvC ?? item.CatIdvC,
        catName: item.catName ?? item.CatName,
        catDes: item.catDes ?? item.CatDes
      }))
    );
  }

  // Ajouter une nouvelle catégorie
  create(category: Category): Observable<Category> {
    return this.http.post<any>(`${this.apiUrl}/add`, category).pipe(
      map(res => ({
        catId: res.catId ?? res.CatId,
        catIdvC: res.catIdvC ?? res.CatIdvC,
        catName: res.catName ?? res.CatName,
        catDes: res.catDes ?? res.CatDes
      }))
    );
  }

  // Mettre à jour une catégorie
  update(id: number, category: Category): Observable<Category> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, category).pipe(
      map(res => ({
        catId: res.catId ?? res.CatId,
        catIdvC: res.catIdvC ?? res.CatIdvC,
        catName: res.catName ?? res.CatName,
        catDes: res.catDes ?? res.CatDes
      }))
    );
  }

  // Supprimer une catégorie
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
