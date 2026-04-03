using System.ComponentModel.DataAnnotations;

namespace expenses_api.Models;

public enum Finalidade
{
    Despesa = 1,
    Receita = 2,
    Ambos = 3
}

public class Category
{
    public Guid CategoryId { get; set; } =  Guid.NewGuid();
    
    [Required(ErrorMessage = "Descrição é obrigatória")]
    [MaxLength(400, ErrorMessage = "Descrição não pode ter mais que 400 caracteres")]
    public string Description { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "Finalidade é obrigatória")]
    public Finalidade Finalidade { get; set; }
    
    public ICollection<Transaction> Transactions { get; set; } = [];
}