/*
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { ChampFormulaireComponent } from '../../shared/champ-formulaire.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ChampFormulaireComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  enCours = false;
  erreur: string | null = null;

  constructor(private fb: NonNullableFormBuilder, private auth: AuthService, private router: Router) {}

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  onLogin(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.enCours = true;
    this.erreur = null;

    const { email, password } = this.form.getRawValue();
    this.auth.login(email, password).subscribe({
      next: () => {
        this.enCours = false;
        this.router.navigate(['/categories']);
      },
      error: () => {
        this.enCours = false;
        this.erreur = 'Email ou mot de passe incorrect.';
      }
    });
  }
}

-----------------------------
Pourquoi utiliser ChampFormulaireComponent
Réutilisation : tu n’écris plus à chaque fois <label>, <input>, et la logique des erreurs.

Accessibilité : il gère automatiquement aria-describedby, role="alert", et annonce les erreurs.

Cohérence : tous tes formulaires ont le même style et comportement.
Explication
Tu remplaces chaque bloc <label> + <input> par <app-champ>.

Le composant ChampFormulaireComponent affiche automatiquement les erreurs (Ce champ est obligatoire, Adresse e‑mail invalide, etc.).

Tu gardes un code HTML léger et cohérent.

Les états enCours et erreur sont gérés dans le TS, comme pour Login.
//
Exemple d’utilisation dans CategoriesComponent
Au lieu de :

html
<div>
  <label class="form-label">Nom</label>
  <input [(ngModel)]="newCategory.catName" name="catName" required />
</div>
Tu peux écrire :

html
<app-champ libelle="Nom" pour="catName" [control]="form.controls.catName">
  <input id="catName" type="text" formControlName="catName" />
</app-champ>
//
*/