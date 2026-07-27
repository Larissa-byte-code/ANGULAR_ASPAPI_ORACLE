using Microsoft.EntityFrameworkCore;
using SmarketApiOracle.Data;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using SmarketApiOracle.Services;
using SmarketApiOracle.Middleware;

namespace SmarketApiOracle
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Récupération de la clé JWT (évite null)
            var jwtKey = builder.Configuration["Jwt:Key"] ?? "DefaultSecretKey";

            // Connexion Oracle
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseOracle(builder.Configuration.GetConnectionString("OracleDb")));

            // Ajout de CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:4200")
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });
              
            // Authentification JWT
            builder.Services.AddAuthentication("Bearer")
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = "SmarketApiOracle",
                        ValidAudience = "SmarketApiOracleUsers",
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(jwtKey)
                        )
                    };
                });

            builder.Services.AddAuthorization();

            // Services DI
            builder.Services.AddScoped<CategoryService>();
            builder.Services.AddScoped<ClientService>();
            builder.Services.AddScoped<ProductService>();
            builder.Services.AddScoped<SellerService>();
            builder.Services.AddScoped<SellingService>();
            builder.Services.AddScoped<AuthService>();

            // Contrôleurs + Swagger
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    // Garde PascalCase pour correspondre au modèle C#
                    options.JsonSerializerOptions.PropertyNamingPolicy = null;
                });

            builder.Services.AddOpenApi();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }
            /*
            builder.Services.AddOpenApi();
            Cette méthode enregistre le générateur OpenAPI dans les services de ton application ASP.NET Core.

            Concrètement, elle dit à ton API : “Prépare un document OpenAPI (openapi.json) qui décrit tous mes endpoints, paramètres et réponses.”

            C’est l’équivalent moderne de AddSwaggerGen() dans les versions plus anciennes.

            🔹 app.MapOpenApi();
            Cette méthode expose la documentation OpenAPI quand ton application tourne en mode développement.

            Elle crée automatiquement une route (souvent /openapi/v1.json ou /swagger) où tu peux consulter :

            Le fichier JSON OpenAPI (la description technique de ton API).

            L’interface Swagger UI interactive pour tester tes endpoints.

            -  La condition if (app.Environment.IsDevelopment()) garantit que cette documentation n’est visible que sur ton poste de dev, pas en production (sécurité).

            🔹 Exemple pratique
            Tu démarres ton API → elle tourne sur http://localhost:5146.

            Tu ouvres :

            http://localhost:5146/openapi/v1.json → fichier JSON de description.

            http://localhost:5146/swagger → interface Swagger UI interactive.

            🎯 Résumé
            AddOpenApi() → prépare la génération de la documentation.

            MapOpenApi() → rend cette documentation accessible via une URL.

            Ensemble, ça te donne automatiquement une doc Swagger interactive pour tester ton API.
            */

            app.UseHttpsRedirection();

            // Activer CORS
            app.UseCors("AllowAngular");

            // Middleware personnalisé
            app.UseMiddleware<ErrorHandlingMiddleware>();
         app.UseMiddleware<JwtMiddleware>();

            // Authentification + Autorisation
            app.UseAuthentication();
            app.UseAuthorization();

            // Mappe les contrôleurs REST automatiquement
            app.MapControllers();

            app.Run();
        }
    }
}
