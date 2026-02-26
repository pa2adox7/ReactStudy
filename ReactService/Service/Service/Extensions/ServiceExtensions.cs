using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Service.Data;
using Service.Infrastructure;
using Service.Models;
using Service.Services;
using System.Text;

namespace Service.Extensions
{
    public static class ServiceExtensions
    {
        public static WebApplicationBuilder AddDatabase(this WebApplicationBuilder builder)
        {
            builder.Services.AddDbContext<AppDbContext>(opt =>
                opt.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
            return builder;
        }

        public static WebApplicationBuilder AddIdentityConfig(this WebApplicationBuilder builder)
        {
            builder.Services.AddIdentity<AppUser, IdentityRole>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false; // 不强制要求特殊符号
                opt.Password.RequiredUniqueChars = 1; // 至少要用一种不同的字符
                opt.Password.RequireLowercase = false; // 不强制包含小写字母
                opt.Password.RequireUppercase = false; // 不强制包含大写字母
                opt.Password.RequireDigit = false; // 不强制包含数字
                opt.Password.RequiredLength = 6;
            })
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders()
            .AddErrorDescriber<Service.Infrastructure.ChineseIdentityErrorDescriber>();
            return builder;
        }

        public static WebApplicationBuilder AddJwtAuth(this WebApplicationBuilder builder)
        {
            var jwtSection = builder.Configuration.GetSection("Jwt");
            builder.Services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSection["Issuer"],
                    ValidAudience = jwtSection["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtSection["Key"]!)),
                    ClockSkew = TimeSpan.Zero
                };
            });
            return builder;
        }

        public static WebApplicationBuilder AddCorsPolicy(this WebApplicationBuilder builder)
        {
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ReactApp", policy =>
                {
                    policy
                        .WithOrigins("http://localhost:5173", "http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
            return builder;
        }

        public static WebApplicationBuilder AddAppServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<JwtService>();
            builder.Services.AddScoped<IAuthService, AuthService>();
            // 后续新增服务在这里加一行
            return builder;
        }
    }
}
