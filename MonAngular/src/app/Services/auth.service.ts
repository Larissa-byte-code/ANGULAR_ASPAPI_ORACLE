import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'http://localhost:5146/api/auth';
 private apiUrl = `${environment.apiUrl}/api/auth`;
  constructor(private http: HttpClient) {}

  // Login : envoie email + password, stocke le token
  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        })
      );
  }
/*
  // Register : adapte les noms pour correspondre au back
  register(username: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, {
      userName: username,   // correspond à UserName côté back
      email: email,         // correspond à Email côté back
      password: password    // correspond au paramètre attendu pour générer PasswordHash
    });
  }
*/
register(username: string, email: string, password: string) {
  return this.http.post(`${this.apiUrl}/register`, {
    userName: username,
    email: email,
    password: password,
    role: 'User'
  });
}



  // Logout : supprime le token
  logout() {
    localStorage.removeItem('token');
  }

  // Récupère le token stocké
  getToken() {
    return localStorage.getItem('token');
  }
}
