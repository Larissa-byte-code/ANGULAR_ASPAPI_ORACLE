using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmarketApiOracle.Models
{
    [Table("TBLUSER")]
    public class TblUser
    {
         [Key]
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            [Column("USERID")]
            public int UserId { get; set; }
       

        [Column("USERNAME")]
        public string? UserName { get; set; }

        [Column("EMAIL")]
        public string? Email { get; set; }

        [Column("PASSWORDHASH")]
        public string? PasswordHash { get; set; }

        [Column("ROLE")]
        public string? Role { get; set; }
    }
}