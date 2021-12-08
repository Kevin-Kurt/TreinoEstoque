using Back_Estoque.Utils.Enums;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Back_Estoque.Models
{
    public class UserModel : IdentityUser<string>
    {
        [Key]                 
        public string Name { get; set; }

        public eUserType UserType { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
      
    }
  
}
