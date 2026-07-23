import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
/*HTTP_INTERCEPTORS : jeton Angular qui permet d’ajouter des interceptors HTTP.

AuthInterceptor : ton interceptor maison qui ajoute par exemple le Bearer Token dans les requêtes API.
*/
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Services/auth.interceptor';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
/*
importProvidersFrom(FormsModule) : rend FormsModule disponible globalement
 (pour utiliser [(ngModel)] dans tes formulaires).
*/
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),                // active le routing
    provideHttpClient(),                  // active HttpClient
    importProvidersFrom(FormsModule),     // active FormsModule globalement
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // ajoute ton interceptor
  ]
};





