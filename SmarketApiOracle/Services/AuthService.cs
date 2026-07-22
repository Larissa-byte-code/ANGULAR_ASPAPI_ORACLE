using Microsoft.IdentityModel.Tokens;
using SmarketApiOracle.Data;
using SmarketApiOracle.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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

        //  Méthode de login qui renvoie un objet { token = ... }
        public object? Login(string email, string password)
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

            return new { token = new JwtSecurityTokenHandler().WriteToken(token) };
        }
    }
}
