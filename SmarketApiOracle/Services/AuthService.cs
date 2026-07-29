using Microsoft.IdentityModel.Tokens;
using SmarketApiOracle.Data;
using SmarketApiOracle.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace SmarketApiOracle.Services
{
    public class AuthService
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _config;

        public AuthService(ApplicationDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        // Méthode d'inscription avec validations
        /*
        public string Register(string username, string email, string password, string role = "User")
            {
                if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
                    throw new ArgumentException("Username, email et password sont obligatoires.");

                
                bool exists = _db.TblUser.Count(u => u.Email == email) > 0;
                    if (exists)
                        throw new InvalidOperationException("Un utilisateur avec cet email existe déjà.");


                var user = new TblUser
                {
                    UserName     = username,
                    Email        = email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                    Role         = role
                };

                _db.TblUser.Add(user);
                _db.SaveChanges();

                return "Utilisateur créé avec succès !";
            }
*/
            // Retourne l’objet créé, pas un string
     

            public TblUser Register(string username, string email, string password, string role = "User")
            {
                // Vérification des champs obligatoires
                if (string.IsNullOrWhiteSpace(username))
                    throw new ArgumentException("Le nom d'utilisateur est obligatoire.");
                if (string.IsNullOrWhiteSpace(email))
                    throw new ArgumentException("L'email est obligatoire.");
                if (string.IsNullOrWhiteSpace(password))
                    throw new ArgumentException("Le mot de passe est obligatoire.");

                // Vérification du format email avec Regex
                if (!Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
                    throw new ArgumentException("Format d'email invalide.");
                // Vérification doublon
                if (_db.TblUser.Any(u => u.Email == email))
                    throw new InvalidOperationException("Un utilisateur avec cet email existe déjà.");

                // Création utilisateur
                var user = new TblUser
                {
                    UserName     = username,
                    Email        = email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                    Role         = role
                };

                _db.TblUser.Add(user);
                _db.SaveChanges();

                return user;
            }
/*
        //  Méthode de login qui renvoie un objet { token = ... }
        public object? Login(string email, string password)
        {
            //Cherche l’utilisateur par email.

            //Si aucun trouvé → retourne null.
            var user = _db.TblUser.SingleOrDefault(u => u.Email == email);
            if (user == null) return null;
            //Vérifie que le mot de passe fourni correspond au hash stocké.

            //Si non → retourne null.
            if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash ?? ""))
                return null;

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.UserName ?? string.Empty),
                new Claim(ClaimTypes.Role, user.Role ?? string.Empty)
            };
            //Récupère la clé JWT depuis la config (ou valeur par défaut).

            //Crée une clé symétrique pour signer le token.

            //Utilise l’algorithme HMAC‑SHA256.
            var jwtKey = _config["Jwt:Key"] ?? "MaCleSecreteParDefaut1234567890AB";
            var key    = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds  = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            /*
            Construit le token JWT :

            issuer = qui a émis le token.

            audience = qui peut l’utiliser.

            claims = infos utilisateur.

            expires = expiration (1h).
           
            signingCredentials = signature avec ta clé.
           
            var token = new JwtSecurityToken(
                issuer: "SmarketApiOracle",
                audience: "SmarketApiOracleUsers",
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds);

            return new { token = new JwtSecurityTokenHandler().WriteToken(token) };
        }
        */
        public string? Login(string email, string password)
            {
                var user = _db.TblUser.SingleOrDefault(u => u.Email == email);
                if (user == null) return null;

                if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash ?? ""))
                    return null;

                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName ?? string.Empty),
                    new Claim(ClaimTypes.Role, user.Role ?? string.Empty)
                };

                var jwtKey = _config["Jwt:Key"] ?? "MaCleSecreteParDefaut1234567890AB";
                var key    = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
                var creds  = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "SmarketApiOracle",
                    audience: "SmarketApiOracleUsers",
                    claims: claims,
                    expires: DateTime.UtcNow.AddHours(1),
                    signingCredentials: creds);

                return new JwtSecurityTokenHandler().WriteToken(token); // Retourne juste le token
            }

    }
}
