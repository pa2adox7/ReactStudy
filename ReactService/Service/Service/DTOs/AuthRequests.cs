namespace Service.DTOs
{
    public class AuthRequests
    {
        public record RegisterRequest(string Email, string Password,string DisPlayName);
        public record LoginRequest(string Email, string Password);
    }
}
