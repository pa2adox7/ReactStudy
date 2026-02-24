using Microsoft.AspNetCore.Identity;
using Service.DTOs;

namespace Service.Services
{
    public interface IAuthService
    {
        Task<IdentityResult> RegisterAsync(AuthRequests.RegisterRequest request);
        Task<string?> LoginAsync(AuthRequests.LoginRequest request);
        Task<bool> CheckUserAsync(string email);
        Task<bool> ResetPassWord(AuthRequests.LoginRequest request);
    }
}
