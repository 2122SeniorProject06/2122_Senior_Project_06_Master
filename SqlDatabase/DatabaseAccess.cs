using System;
using Microsoft.Extensions.Configuration;
using System.Data;
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
            SetupAndCreateTables();
        }

        /// <summary>
        /// Ensures all necessary tables are set up in which ever database.
        /// </summary>
        private static void SetupAndCreateTables()
        {
            string[] tableNames = {"UserAccounts"};
            string[] tableValues = {"UserID varchar(8), UserName varchar(256), Password varchar(64), EMail varchar(256)"};
            int index = 0;
            foreach(var tableName in tableNames)
            {
                CreateTable(tableName, tableValues[index]);
                index++;
            }
        }

        /// <summary>
        /// Creates a table in the database.
        /// </summary>
        /// <param name="tableName">The name of the table to create.</param>
        /// <param name="values">The values of the new tables.</param>
        public static void CreateTable(string tableName, string values)
        {
            string request = string.Format("CREATE TABLE {0} ({1});", tableName, values);
            try
            {
                DatabaseConnection.SendRequest(request);
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                if(e.Message != "There is already an object named '{0}' in the database.")
                {
                    Console.WriteLine(e.GetType());
                    Console.WriteLine(e.StackTrace);
                }
            }
        }

        /// <summary>
        /// Adds an entry to a table. 
        /// </summary>
        /// <param name="tableName">The table to add to the entry.</param>
        /// <param name="values">The values of the new entry.</param>
        public static void AddEntryToTable(string tableName, string values)
        {
            string request = string.Format("INSERT INTO {0} VALUES ({1});", tableName, values);
            DatabaseConnection.SendRequest(request);
            
        }

        /// <summary>
        /// Updates an entry in a data table.
        /// </summary>
        /// <param name="tableName">The table to update.</param>
        /// <param name="values">The value(s) to update.</param>
        /// <param name="requirements">The required item(s) to update.</param>
        public static void UpdateEntryInTable(string tableName, string values, string requirements)
        {
            if(requirements == null)
            {
                throw new Exception("WHERE CLAUSE MUST BE SPECIFIED. LACK OF WHERE CLAUSE WILL UPDATE ALL ENTRIES.");
            }
            string request = string.Format("UPDATE {0} SET {1} WHERE {2};", tableName, values, requirements);
            DatabaseConnection.SendRequest(request);
        }

        /// <summary>
        /// Removes an entry from a data table.
        /// </summary>
        /// <param name="tableName">The data table to remove from.</param>
        /// <param name="requirements">The required item(s) to remove.</param>
        public static void DeleteEntryFromTable(string tableName, string requirements)
        {
            if(requirements == null)    
            {
                throw new Exception("WHERE CLAUSE MUST BE SPECIFIED. LACK OF WHERE CLAUSE WILL DELETE ALL ENTRIES.");
            }
            string request = string.Format("DELETE FROM {0} WHERE {1};", tableName, requirements);
            DatabaseConnection.SendRequest(request);
        }

        /// <summary>
        /// Selects items from a table.
        /// </summary>
        /// <param name="tableName">The name of the table to select from.</param>
        /// <param name="itemsToSelect">The specific items to select.</param>
        /// <param name="requirements">The requirements for which entries to select from.</param>
        /// <returns>A list of selected items.</returns>
        public static DataTable Select(string tableName, string itemsToSelect = null, string requirements = null)
        {
            string requestTemplate = "SELECT {0} FROM {1}{2};";
            string items = itemsToSelect ?? "*";
            string condition = string.Empty;
            string request = string.Empty;
            if (requirements != null)
            {
                condition = string.Format(" WHERE {0}", requirements);
            }
            request = string.Format(requestTemplate, items, tableName, condition);
            return DatabaseConnection.SendRequest(request);
        }

    }
}