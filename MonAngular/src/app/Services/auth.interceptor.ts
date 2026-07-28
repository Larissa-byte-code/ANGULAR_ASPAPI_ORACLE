import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();
    if (token) {
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
/*
 Ton AuthInterceptor en Angular sert à intercepter toutes les requêtes HTTP sortantes 
 et à leur ajouter automatiquement le token JWT d’authentification.

🔹 Rôle exact
Angular possède un mécanisme d’interceptor qui agit comme un “middleware” entre ton application et le serveur.

Ici, ton AuthInterceptor :

Récupère le token via AuthService.getToken().

Clone la requête HTTP (car les requêtes Angular sont immuables).

Ajoute un header Authorization: Bearer <token>.

Passe la requête modifiée au backend (next.handle(cloned)).
*/