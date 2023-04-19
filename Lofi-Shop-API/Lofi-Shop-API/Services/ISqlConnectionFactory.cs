using Microsoft.Data.SqlClient;

namespace Lofi_Shop_API.Services
{
    public interface ISqlConnectionFactory
    {
        public SqlConnection CreateConnection();
    }
}
