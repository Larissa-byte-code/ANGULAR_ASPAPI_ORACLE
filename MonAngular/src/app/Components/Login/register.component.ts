import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,              // composant standalone
  imports: [FormsModule],        // FormsModule pour ngModel
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  onRegister() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        alert('Inscription réussie !');
        // tu peux rediriger vers /login ici
      },
      error: (err) => {
        if (err.status === 400) {
          // Validation : email invalide, champ vide, etc.
          alert(err.error?.Message || 'Données invalides');
        } else if (err.status === 409) {
          // Doublon : email déjà utilisé
          alert('Un compte avec cet email existe déjà.');
        } else {
          // Erreur serveur
          alert('Erreur serveur. Réessayez plus tard.');
        }
      }
    });
  }
}
