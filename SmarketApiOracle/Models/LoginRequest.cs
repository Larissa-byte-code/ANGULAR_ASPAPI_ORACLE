using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 

namespace SmarketApiOracle.Models
{
        public class LoginRequest
                {
                    public string Email { get; set; } = string.Empty;
                    public string Password { get; set; } = string.Empty;
                }


}
/*
DTO signifie Data Transfer 
Object (Objet de Transfert de Données).

Son rôle est de transporter uniquement les données
nécessaires entre le client (React, Angular, mobile...) et l'API.

Base SQL
     │
     ▼
Entity (class C#)
     │
     ▼
DTO (class C#)
     │
     ▼
JSON
     │
     ▼
Interface TypeScript

Backend → class (Entity, DTO)
Frontend → interface (pour typer les données JSON)
*/