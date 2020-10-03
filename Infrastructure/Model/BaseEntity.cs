using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Model
{
    public class BaseEntity
    {
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
    }
}
