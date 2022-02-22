using System;
using System.Text;
using System.Security.Cryptography;

namespace _2122_Senior_Project_06
{
    /// <summary>
    /// Class in charge of system and cyber security.
    /// </summary>
    /// <remarks>  Created by Andrew Bevilacqua. Last updated on 12/09/21.  </remarks>
    public class Sys_Security
    {
        /// <summary>
        /// Converts passed value into hashed SHA256 form.
        /// </summary>
        /// <param name="args">Value to hash.</param>
        /// <returns>The hashed value.</returns>
        private static string SHA256_Hash(string args)
        {
            SHA256Managed _sha256 = new SHA256Managed();
            byte[] _cipherText = _sha256.ComputeHash(Encoding.Default.GetBytes(args));
            return Convert.ToBase64String(_cipherText);
        }

        /// <summary>
        /// Verify input is not a SQL injection attack.
        /// </summary>
        /// <param name="args">The value to check.</param>
        /// <returns>If the value is a clean input or not.</returns>
        private static bool SQLCheck(string args) 
        {
            
            bool isSQLInjection = false;
            string[] sqlCheckList = { "--", ";--", ";", "/*" ,
                    "*/" ,"@@" ,"char" ,"nchar" ,"varchar" ,"nvarchar" ,
                    "alter" ,"begin", "cast", "create", "cursor", "declare", 
                    "delete", "drop", "end", "exec", "execute", "fetch", "insert", 
                    "select", "sys", "sysobjects", "syscolumns", "table", 
                    "update"}; // array of know SQL commands
            string CheckString = args.Replace("'", "''");

            for (int i = 0; i <= sqlCheckList.Length - 1; i++)
            {

                if ((CheckString.IndexOf(sqlCheckList[i], StringComparison.OrdinalIgnoreCase) >= 0))
                {    

                    isSQLInjection = true;

                }

            }

            return isSQLInjection;
            // This is a temporary implementation, certain characters and strings that SHOULD be viable
            // in a valid password conflict with they sqlChecklist array
        }

        /// <summary>
        /// Verify if the provided password matches the stored password.
        /// </summary>
        /// <param name="Curr_pass">The password provided by the user.</param>
        /// <param name="Stored_pass">The password retrieved by the database.</param>
        /// <returns>Whether the passwords match or not.</returns>
        private static bool PassCheck(string curr, string username) // verifies inputted passwords matches stored
        {
            /*if(64_bit(Curr) == "64_bit of Admin name"
               {
                    TERMINATE
               }*/

            string Curr_hash = SHA256_Hash(curr);
            string Stored_hash = null; //look up via username?
            bool verify = false;
            //int entry_attempt = 0;
            if (Curr_hash == Stored_hash)
            {
                verify = true; //cant i just say return true? take away the verify all together
                // allow user's access to application(under their account)
                //      Should return verify = true, prefrom extra operation?
            }
            else
            {
                
                //if(entry_attempt == 10)
                //{
                    //lock account? send warning to email on file + lock account?
                //}
                verify = false;
            }
            return verify;
        }

        /// <summary>
        /// Checks username and password against registration policies.
        /// </summary>
        /// <param name="args">Password to check.</param>
        /// <returns>If the password matches the registration policies.</returns>
        private static bool NPassCheck(string args)
        {
            bool verify_length = false;
            bool verify_chars = false; 
            bool verify_num = false;

            if(args.Length >= 8 && args.Length <= 64)
            {
                verify_length = true;
                foreach (char characters in args)
                {
                    if(characters.ToString() == char.ToUpper(characters).ToString() &&
                        characters.ToString() == char.ToLower(characters).ToString())
                    {
                        verify_chars = true;
                    }
                }
                foreach (char characters in args) // just move to first loop?
                {
                    if(char.IsDigit(characters))
                    {
                        verify_num = true;
                    }
                }
            }
            if(verify_length && verify_chars && verify_num)
            {
                return true;
            }
            else
            {
                return false;
            }

            // current implementatin is subject to change. This is a rough implementations and does not account for special characters
            // certain passwords conflict with VerifySQL() function
        }

        /*
         *      Public Functions
         */
        public static bool VerifySQL(string args)
        {
            return(SQLCheck(args));
        }
        public static bool VerifyPass(string arg1, string arg2)
        {
            return(PassCheck(arg1,arg2));
        }
        public static bool VerifyNewPass(string args)
        {
            return(NPassCheck(args));
        }
        public static int GenUID(int args)
        {
            /*
             * Read how many current users there are
             * generate an 8 digit number corresponding to the number of users
             */
            // int curr_users = 0;
            // 
            return 0;
        }
    }
}
