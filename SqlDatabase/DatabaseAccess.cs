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

        public static void Select(string itemsToSelect, string tableName, string requirements = null)
        {
            string request = string.Format("SELECT {0} FROM {1};", itemsToSelect, tableName);
            if(requirements != null)
            {
                string condition = string.Format(" WHERE {0};", requirements);
                request.Replace(";", condition);
            }
            DatabaseConnection.SendRequest(request);
        }

        private string SelectFormatter(string tableName, string itemsToSelect = null, string requirements = null)
        {
            string request = "SELECT {0} FROM {1}{2};";
            string items = itemsToSelect ?? "*";
            string condition = string.Empty;
            if (requirements != null)
            {
                condition = string.Format(" WHERE {0}", requirements);
            }

            return string.Format(request, items, tableName, condition);
        }
    }
}