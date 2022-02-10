using System;
using Microsoft.Extensions.Configuration;
namespace _2122_Senior_Project_06.SqlDatabase
{
    /// <summary>
    /// Runs database commands.
    /// </summary>
    public class DatabaseAccess
    {
        /// <summary>
        /// Sets up the database for connection.
        /// </summary>
        /// <param name="configuration">The configuration file.</param>
        public static void SetupDatabase(IConfiguration configuration)
        {
            var encodedConnectionString = configuration.GetConnectionString("ShardDB");
            DatabaseConnection.ConfigureConnectionString(encodedConnectionString);
        }
    }
}