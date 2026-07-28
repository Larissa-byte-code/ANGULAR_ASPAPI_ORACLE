import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { Category } from '../../Models/category.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
 
  newCategory: Category = { catId: 0, catName: '', catDes: '', catIdvC: '' };

  editCategory: Category | null = null;
  message = '';
  isError = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

 loadCategories(): void {
  this.categoryService.getAll().subscribe({
    next: data => {
      this.categories = data;
      console.log('Catégories chargées :', this.categories);
    },
    error: err => this.showMessage('Erreur chargement : ' + err.message, true)
  });
}


  create(): void {
    this.categoryService.create(this.newCategory).subscribe({
      next: () => {
        this.showMessage('Categorie ajoutee avec succes !', false);
        this.newCategory = { catName: '', catDes: '' };
        this.loadCategories();
      },
      error: err => this.showMessage('Erreur ajout : ' + err.message, true)
    });
  }

  startEdit(cat: Category): void {
    this.editCategory = { ...cat };
  }

  update(): void {
    if (!this.editCategory?.catId) return;
    this.categoryService.update(this.editCategory.catId, this.editCategory).subscribe({
      next: () => {
        this.showMessage('Categorie modifiee !', false);
        this.editCategory = null;
        this.loadCategories();
      },
      error: err => this.showMessage('Erreur modification : ' + err.message, true)
    });
  }

  delete(id: number): void {
    if (!confirm('Supprimer cette categorie ?')) return;
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.showMessage('Categorie supprimee !', false);
        this.loadCategories();
      },
      error: err => this.showMessage('Erreur suppression : ' + err.message, true)
    });
  }

  cancelEdit(): void {
    this.editCategory = null;
  }

  showMessage(msg: string, error: boolean): void {
    this.message  = msg;
    this.isError  = error;
    setTimeout(() => this.message = '', 3000);
  }
}
/*
Ton composant :

ngOnInit → charge les catégories.

loadCategories → récupère toutes les catégories.

create → ajoute une catégorie.

startEdit / update / cancelEdit → gère la modification.

delete → supprime une catégorie.

showMessage → affiche un message temporaire.

 C’est un CRUD complet côté Angular, qui communique avec ton backend via CategoryService.

 Le rôle de subscribe
En Angular, les méthodes de ton CategoryService (comme getAll, create, update, delete) retournent des Observables (via HttpClient).
- Un Observable est un flux de données asynchrones (par ex. une réponse HTTP).

Pour consommer ce flux, tu dois t’abonner avec subscribe.
*/