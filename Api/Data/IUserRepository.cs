namespace Api
{
    public interface IUserRepository
    {
        UserEntity? GetByUsernameAndPassword(string username, string password);
    }
}
