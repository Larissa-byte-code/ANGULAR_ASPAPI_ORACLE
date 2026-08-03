/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { Category } from '../../Models/category.model';
import { ChampFormulaireComponent } from '../../shared/champ-formulaire.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ChampFormulaireComponent],
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  message = '';
  isError = false;
  etat: 'chargement' | 'ok' | 'vide' | 'erreur' = 'chargement';

  //  Formulaires réactifs
  formAjout = this.fb.group({
    catName: ['', [Validators.required, Validators.maxLength(100)]],
    catDes: ['', [Validators.required, Validators.maxLength(200)]],
    catIdvC: ['PENDING']
  });

  formEdition = this.fb.group({
    catId: [0],
    catName: ['', [Validators.required, Validators.maxLength(100)]],
    catDes: ['', [Validators.required, Validators.maxLength(200)]],
    catIdvC: ['']
  });

  editMode = false;

  constructor(private categoryService: CategoryService, private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.etat = 'chargement';
    this.categoryService.getAll().subscribe({
      next: data => {
        this.categories = data;
        this.etat = this.categories.length === 0 ? 'vide' : 'ok';
      },
      error: err => {
        this.showMessage('Erreur chargement : ' + err.message, true);
        this.etat = 'erreur';
      }
    });
  }

  create(): void {
    if (this.formAjout.invalid) { this.formAjout.markAllAsTouched(); return; }
    this.categoryService.create(this.formAjout.getRawValue()).subscribe({
      next: () => {
        this.showMessage('Catégorie ajoutée avec succès !', false);
        this.formAjout.reset({ catIdvC: 'PENDING' });
        this.loadCategories();
      },
      error: err => {
        this.showMessage('Erreur ajout : ' + err.message, true);
        this.etat = 'erreur';
      }
    });
  }

  startEdit(cat: Category): void {
    this.editMode = true;
    this.formEdition.patchValue(cat);
  }

  update(): void {
    if (this.formEdition.invalid) { this.formEdition.markAllAsTouched(); return; }
    this.categoryService.update(this.formEdition.value.catId!, this.formEdition.getRawValue()).subscribe({
      next: () => {
        this.showMessage('Catégorie modifiée !', false);
        this.editMode = false;
        this.loadCategories();
      },
      error: err => {
        this.showMessage('Erreur modification : ' + err.message, true);
        this.etat = 'erreur';
      }
    });
  }

  delete(id: number): void {
    if (!confirm('Supprimer cette catégorie ?')) return;
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.showMessage('Catégorie supprimée !', false);
        this.loadCategories();
      },
      error: err => {
        this.showMessage('Erreur suppression : ' + err.message, true);
        this.etat = 'erreur';
      }
    });
  }

  cancelEdit(): void {
    this.editMode = false;
  }

  showMessage(msg: string, error: boolean): void {
    this.message = msg;
    this.isError = error;
    setTimeout(() => this.message = '', 3000);
  }
}
*/