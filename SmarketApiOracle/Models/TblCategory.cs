using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 

namespace SmarketApiOracle.Models
{
    public class TblCategory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CatId { get; set; }

        // Autoriser null avec string?
        public string? CatName { get; set; }   
        public string? CatDes { get; set; }    

        // Valeur par défaut si null
        public string CatIdvC { get; set; } = "PENDING";
    }
}
