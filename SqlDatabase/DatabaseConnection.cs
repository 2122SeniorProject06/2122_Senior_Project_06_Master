using System;
using Microsoft.Data.SqlClient;
using System.Data.Common;
using System.Collections.Generic;

namespace _2122_Senior_Project_06.SqlDatabase
{
    //Internal classes are public to the classes in the same namespace,
    //but private to those outside of it.
    internal class DatabaseConnection
    {
        private static string _connectionString;

        /// <summary>
        /// Sends a sql request to the database.
        /// </summary>
        /// <param name="request">The request to send.</param>
        /// <returns>The result of the request, if applicable.</returns>
        /// <remarks>Returns a list of List<string> with the values. </remarks>
        public static List<object> SendRequest(string request)
        {
            //Return value
            List<object> userItems = new List<object>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                SqlCommand command = new SqlCommand(request, connection);
                command.Connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        foreach(DbDataRecord item in reader)
                        {
                            List<string> vs = new List<string>();
                            for(int i = 0; i < item.FieldCount; i++)
                            {
                                vs.Add(item.GetValue(i).ToString());
                            }
                            userItems.Add(vs);
                        }
                    }
                }
            }
            return userItems;
        }

        /// <summary>
        /// Configures the connection string to use in the class.
        /// </summary>
        /// <param name="connectionString"></param>
        public static void ConfigureConnectionString(string connectionString)
        {
            //Decrypts encoded connection string into bytes.
            var decryptedBytes = System.Convert.FromBase64String(connectionString);
            //Converts bytes into decoded connection  string.
            _connectionString = System.Text.Encoding.UTF8.GetString(decryptedBytes);
        }
    }
}