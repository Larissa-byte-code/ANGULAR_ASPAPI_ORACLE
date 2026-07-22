import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,              //  composant standalone
  imports: [FormsModule],        //  FormsModule pour ngModel
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  onRegister() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => alert('Utilisateur créé avec succès !'),
      error: () => alert('Erreur lors de l’inscription')
    });
  }
}
