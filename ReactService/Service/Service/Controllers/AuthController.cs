using Microsoft.AspNetCore.Mvc;
using Service.DTOs;
using Service.Services;

namespace Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register(AuthRequests.RegisterRequest request)
        {
            var result = await authService.RegisterAsync(request);
            if (!result.Succeeded) return BadRequest(result.Errors);
            return Ok(new { message = "注册成功" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthRequests.LoginRequest request)
        {
            var token = await authService.LoginAsync(request);
            if (token is null) return Unauthorized(new { message = "邮箱或密码错误" });
            return Ok(new { token });
        }

        [HttpGet("checkUser")]
        public async Task<IActionResult> CheckUser(string email)
        {
            var result = await authService.CheckUserAsync(email);
            return Ok(result);
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassWord(AuthRequests.LoginRequest request)
        {
            var result = await authService.ResetPassWord(request);
            return Ok(result);
        }

        [HttpGet("userEmailList")]
        public async Task<IActionResult> GetUserEmailList()
        {
            var result = await authService.GetUserEmailList();
            return Ok(result);
        }
    }
}
