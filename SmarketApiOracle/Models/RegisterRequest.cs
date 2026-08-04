using System.ComponentModel.DataAnnotations;

namespace SmarketApiOracle.Models
{
    public class RegisterRequest
    {
        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public string Role { get; set; } = "User";
    }
}
/*
DTO pour l'inscription

Le formulaire d'inscription contient par exemple :

UserName
Email
Password
Role

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