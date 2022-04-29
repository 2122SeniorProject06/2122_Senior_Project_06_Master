using _2122_Senior_Project_06.Models;
namespace  _2122_Senior_Project_06.Types
{
    /// <summary>
    /// Class for User Account data type.
    /// </summary>
    /// <remarks> Paired programmed by Hugo, Andrew, and Sarah. </remarks>
    public class UserAccount
    {
        public string UserID { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public bool DarkMode {get; set;}

        public string Background {get;set;}

        public UserAccount()
        {

        }

        /// <summary>
        /// Parameterized constructor for new account.
        /// </summary>
        /// <param name="username">The chosen username.</param>
        /// <param name="email">The chosen email.</param>
        /// <param name="password">The chosen password. Hash before sending.</param>
        public UserAccount(string username, string email, string password, bool darkMode = false, string background = null)
        {
            Username = username;
            Password = password;
            Email = email;
            UserID = Sys_Security.GenID(UserID,true);
            DarkMode = darkMode;
            Background = background ?? BackgroundItems.Mountain;
        }

        public UserAccount(AccountModel account)
        {
            Username = account.new_Username;
            Password = account.new_Password;
            Email = account.new_Email;
            UserID = account.userID;
        }

        /// <summary>
        /// Returns values in a SQL value format.
        /// </summary>
        /// <returns>All values formatted into SQL.</returns>
        public string ToSqlString(bool isUpdate)
        {
            string[] values = { UserID, Sys_Security.Encoder(Username), Sys_Security.Encoder(Password),
                                Sys_Security.Encoder(Email), (DarkMode ? 1 : 0).ToString(), Sys_Security.Encoder(Background) };

            if(isUpdate)
            {
                values[0] =  string.Format("{0} = '{1}'", UserAccountsItems.User_ID, values[0]);
                values[1] =  string.Format("{0} = '{1}'", UserAccountsItems.Username, values[1]);
                values[2] =  string.Format("{0} = '{1}'", UserAccountsItems.Password, values[2]);
                values[3] =  string.Format("{0} = '{1}'", UserAccountsItems.Email, values[3]);
                values[4] =  string.Format("{0} = {1}", UserAccountsItems.DarkMode, values[4]);
                values[5] =  string.Format("{0} = '{1}'", UserAccountsItems.Background, values[5]);
            }
            else
            {
                for(int i = 0; i < values.Length; i++)
                {
                    values[i] =  string.Format("'{0}'", values[i]);
                }
            }
            return string.Format("{0}, {1}, {2}, {3}, {4}, {5}",
                                 values[0], values[1],
                                 values[2], values[3],
                                 values[4], values[5]);
        }

        /// <summary>
        /// Updates the data of the user account.
        /// </summary>
        /// <param name="newInfo">The updated information.</param>
        public void UpdateInfo(UserAccount newInfo)
        {
            Username = !string.IsNullOrEmpty(newInfo.Username) ? newInfo.Username : Username;
            Password = !string.IsNullOrEmpty(newInfo.Password) ? newInfo.Password : Password;
            Email = !string.IsNullOrEmpty(newInfo.Email) ? newInfo.Email : Email;
            Background = !string.IsNullOrEmpty(newInfo.Background) ? newInfo.Background : Background;
            DarkMode = newInfo.DarkMode != DarkMode ? newInfo.DarkMode : DarkMode;
        }
    }    
}