using System.ComponentModel.DataAnnotations;
namespace expenses_api.Models;

public class Person
{
    public Guid PersonId { get; set; } = Guid.NewGuid();
    
    [Required]
    [MaxLength(200, ErrorMessage = "Nome não pode ter mais que 200 caracteres")]
    public string Name { get; set; } =  string.Empty;
    
    [Required]
    [Range(0,130)]
    public int Age { get; set; }
    
    public ICollection<Transaction> Transactions { get; set; } = [];
}