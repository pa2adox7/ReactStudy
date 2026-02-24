using Microsoft.AspNetCore.Identity;

namespace Service.Models
{
    public class AppUser : IdentityUser
    {
        public string? DisPlayName { get; set; }
    }
}
