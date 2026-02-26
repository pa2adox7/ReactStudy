using Microsoft.AspNetCore.Identity;

namespace Service.Infrastructure
{
    public class ChineseIdentityErrorDescriber : IdentityErrorDescriber
    {
        public override IdentityError DefaultError() => new() { Code = nameof(DefaultError), Description = "发生了未知错误。" };
        public override IdentityError ConcurrencyFailure() => new() { Code = nameof(ConcurrencyFailure), Description = "乐观并发失败，对象已被修改。" };
        public override IdentityError PasswordMismatch() => new() { Code = nameof(PasswordMismatch), Description = "密码错误。" };
        public override IdentityError InvalidToken() => new() { Code = nameof(InvalidToken), Description = "令牌无效。" };
        public override IdentityError LoginAlreadyAssociated() => new() { Code = nameof(LoginAlreadyAssociated), Description = "该用户已有关联的登录。" };
        public override IdentityError InvalidUserName(string? userName) => new() { Code = nameof(InvalidUserName), Description = $"用户名 '{userName}' 无效，只能包含字母或数字。" };
        public override IdentityError InvalidEmail(string? email) => new() { Code = nameof(InvalidEmail), Description = $"邮箱 '{email}' 无效。" };
        public override IdentityError DuplicateUserName(string userName) => new() { Code = nameof(DuplicateUserName), Description = $"用户名 '{userName}' 已被占用。" };
        public override IdentityError DuplicateEmail(string email) => new() { Code = nameof(DuplicateEmail), Description = $"邮箱 '{email}' 已被占用。" };
        public override IdentityError InvalidRoleName(string? role) => new() { Code = nameof(InvalidRoleName), Description = $"角色名 '{role}' 无效。" };
        public override IdentityError DuplicateRoleName(string role) => new() { Code = nameof(DuplicateRoleName), Description = $"角色名 '{role}' 已存在。" };
        public override IdentityError UserAlreadyHasPassword() => new() { Code = nameof(UserAlreadyHasPassword), Description = "该用户已设置了密码。" };
        public override IdentityError UserLockoutNotEnabled() => new() { Code = nameof(UserLockoutNotEnabled), Description = "该用户未启用锁定。" };
        public override IdentityError UserAlreadyInRole(string role) => new() { Code = nameof(UserAlreadyInRole), Description = $"用户已拥有 '{role}' 角色。" };
        public override IdentityError UserNotInRole(string role) => new() { Code = nameof(UserNotInRole), Description = $"用户不拥有 '{role}' 角色。" };
        public override IdentityError PasswordTooShort(int length) => new() { Code = nameof(PasswordTooShort), Description = $"密码至少需要 {length} 位。" };
        public override IdentityError PasswordRequiresNonAlphanumeric() => new() { Code = nameof(PasswordRequiresNonAlphanumeric), Description = "密码至少包含一个非字母数字字符。" };
        public override IdentityError PasswordRequiresDigit() => new() { Code = nameof(PasswordRequiresDigit), Description = "密码至少包含一个数字 ('0'-'9')。" };
        public override IdentityError PasswordRequiresLower() => new() { Code = nameof(PasswordRequiresLower), Description = "密码至少包含一个小写字母 ('a'-'z')。" };
        public override IdentityError PasswordRequiresUpper() => new() { Code = nameof(PasswordRequiresUpper), Description = "密码至少包含一个大写字母 ('A'-'Z')。" };
    }
}
