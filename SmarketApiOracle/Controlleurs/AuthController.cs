using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SmarketApiOracle.Services;
using SmarketApiOracle.Models;
using System.Security.Claims;

namespace SmarketApiOracle.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _service;

        public AuthController(AuthService service)
        {
            _service = service;
        }

        // Accessible sans token
        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            try
            {
                // Vérification côté service
                var result = _service.Register(
                    request.UserName,
                    request.Email,
                    request.Password,
                    request.Role
                );

                // Succès
                return Ok(new { Message = "Inscription réussie ", User = result });
            }
            catch (InvalidOperationException ex)
            {
                // Erreur métier (ex: email déjà utilisé)
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                // Erreur serveur
                return StatusCode(500, new { Message = "Erreur lors de l’inscription ❌", Details = ex.Message });
            }
        }

        // Login avec JSON
        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var tokenObj = _service.Login(request.Email, request.Password);
            return tokenObj == null ? Unauthorized(new { Message = "Email ou mot de passe incorrect ❌" }) 
                                    : Ok(new { Message = "Connexion réussie ✅", Token = tokenObj });
        }

        // Protégé par Bearer Token
        [HttpGet("profile")]
        [Authorize]
        public IActionResult Profile()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userName = User.Identity?.Name;

            return Ok(new
            {
                Message = "Voici ton profil sécurisé !",
                UserId = userId,
                UserName = userName
            });
        }

        // Réservé aux Admins
        [HttpGet("admin-data")]
        [Authorize(Roles = "Admin")]
        public IActionResult AdminData()
        {
            return Ok("Données sensibles réservées aux Admins !");
        }
    }
}
