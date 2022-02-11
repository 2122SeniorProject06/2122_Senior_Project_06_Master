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

        public static void CreateTable()
        {
            string request = "CREATE TABLE TestTable (FirstName varchar(255), LastName varchar(255));";
            DatabaseConnection.SendRequest(request);
        }

        public static void SelectAll()
        {
            string request = "SELECT * FROM TestTable;";
            DatabaseConnection.SendRequest(request);
        }
    }
}