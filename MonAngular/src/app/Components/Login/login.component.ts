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
      error: () => alert('Email ou mot de passe incorrect')
    });
  }
}
