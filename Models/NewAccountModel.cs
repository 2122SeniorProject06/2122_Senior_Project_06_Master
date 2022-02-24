using System;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using _2122_Senior_Project_06;

namespace  _2122_Senior_Project_06.Models
{
    public class NewAccPage
    {
        public int UserID { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        /// <summary>
        /// Returns values in a SQL value format.
        /// </summary>
        /// <returns>All values formatted into SQL.</returns>
        public string ToSqlString()
        {
            return string.Format("{0}, '{1}', '{2}', '{3}'",
                                 UserID,
                                 Sys_Security.Encoder(Username),
                                 Sys_Security.Encoder(Password), 
                                 Sys_Security.Encoder(Email));
        }
    }
}