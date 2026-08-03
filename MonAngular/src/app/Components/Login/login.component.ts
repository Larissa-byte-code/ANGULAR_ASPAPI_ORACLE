import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';          
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],// FormsModule pour ngModel
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  enCours = false;          //  état de chargement
  erreur: string | null = null;  //  message d'erreur

  constructor(private authService: AuthService, private router: Router) {}  

  onLogin() {
    if (!this.email || !this.password) {
      this.erreur = 'Veuillez remplir tous les champs.';
      return;
    }

    this.enCours = true;
    this.erreur = null;

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.enCours = false;
        this.router.navigate(['/categories']);   //  redirection après succès
      },
      error: (err) => {
        this.enCours = false;
        if (err.status === 401) {
          this.erreur = err.error?.Message || 'Email ou mot de passe incorrect';
        } else if (err.status === 400) {
          this.erreur = err.error?.Message || 'Données invalides';
        } else {
          this.erreur = 'Erreur serveur. Réessayez plus tard.';
        }
      }
    });
  }
}
