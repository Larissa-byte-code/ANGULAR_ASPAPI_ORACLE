import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,              // composant standalone
  imports: [FormsModule, CommonModule],// FormsModule pour ngModel
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  enCours = false;          // état de chargement
  erreur: string | null = null;  // message d'erreur

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (!this.username || !this.email || !this.password) {
      this.erreur = 'Veuillez remplir tous les champs.';
      return;
    }

    this.enCours = true;
    this.erreur = null;

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.enCours = false;
        this.router.navigate(['/login']); //  redirection après succès
      },
      error: (err) => {
        this.enCours = false;
        if (err.status === 400) {
          this.erreur = err.error?.Message || 'Données invalides';
        } else if (err.status === 409) {
          this.erreur = 'Un compte avec cet email existe déjà.';
        } else {
          this.erreur = 'Erreur serveur. Réessayez plus tard.';
        }
      }
    });
  }
}
