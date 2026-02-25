namespace Service.DTOs
{
    public class AuthResponses
    {
        public record UserInfoResponse(string Email, string? DisplayName);
    }
}
