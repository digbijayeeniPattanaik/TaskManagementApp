using Infrastructure.Model;

namespace API.Services
{
    public interface ITokenService
    {
        string CreateToken(User user);
        Outcome<string> ValidateCurrentUserEmailFromToken(string token);
    }
}
