import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';          
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,   // Angular 17 standalone
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}  

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        alert('Connexion réussie !');
        this.router.navigate(['/categories']);   
      },
      error: (err) => {
        if (err.status === 401) {
          // Mauvais identifiants
          alert(err.error?.Message || 'Email ou mot de passe incorrect');
        } else if (err.status === 400) {
          // Erreur de validation (champs vides, format email invalide)
          alert(err.error?.Message || 'Données invalides');
        } else {
          // Erreur serveur
          alert('Erreur serveur. Réessayez plus tard.');
        }
      }
    });
  }
}
