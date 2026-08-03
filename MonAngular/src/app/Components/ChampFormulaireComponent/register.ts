/*
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { ChampFormulaireComponent } from '../../shared/champ-formulaire.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ChampFormulaireComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  enCours = false;
  erreur: string | null = null;

  constructor(private fb: NonNullableFormBuilder, private auth: AuthService, private router: Router) {}

  form = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onRegister(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.enCours = true;
    this.erreur = null;

    const { username, email, password } = this.form.getRawValue();
    this.auth.register(username, email, password).subscribe({
      next: () => {
        this.enCours = false;
        this.router.navigate(['/login']);
      },
      error: () => {
        this.enCours = false;
        this.erreur = 'Inscription impossible. Vérifiez vos données.';
      }
    });
  }
}
*/