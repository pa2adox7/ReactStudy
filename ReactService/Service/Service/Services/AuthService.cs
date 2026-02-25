using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Service.DTOs;
using Service.Infrastructure;
using Service.Models;

namespace Service.Services
{
    public class AuthService(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, JwtService jwtService) : IAuthService
    {
        public async Task<IdentityResult> RegisterAsync(AuthRequests.RegisterRequest request)
        {
            var user = new AppUser { UserName = request.Email, Email = request.Email, DisPlayName = request.DisPlayName };
            return await userManager.CreateAsync(user, request.Password);
        }

        public async Task<string?> LoginAsync(AuthRequests.LoginRequest request)
        {
            var result = await signInManager.PasswordSignInAsync(
                request.Email, request.Password, false, false);

            if (!result.Succeeded) return null;

            var user = await userManager.FindByEmailAsync(request.Email);
            return jwtService.GenerateToken(user!);
        }

        public async Task<bool> CheckUserAsync(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
                return true;
            else
                return false;
        }

        public async Task<bool> ResetPassWord(AuthRequests.LoginRequest request)
        {
            var user = await userManager.FindByEmailAsync(request.Email);
            if (user == null) return false;
            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var result = await userManager.ResetPasswordAsync(user, token, request.Password);
            return result.Succeeded;
        }

        public async Task<List<AuthResponses.UserInfoResponse>> GetUserEmailList()
        {
            var result = await userManager.Users
                .Where(n => !string.IsNullOrWhiteSpace(n.Email))
                .Select(n => new AuthResponses.UserInfoResponse(
                    n.Email!.ToLower(),
                    n.DisPlayName)).ToListAsync();
            return result;
        }
    }
}
