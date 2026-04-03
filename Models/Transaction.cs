using System.ComponentModel.DataAnnotations;

namespace expenses_api.Models;

public enum TransactionType
{
    Despesa = 1,
    Receita = 2
}

public class Transaction
{
    public Guid TransactionId { get; set; } = Guid.NewGuid();
    
    [Required(ErrorMessage = "Descrição é obrigatória")]
    [MaxLength(400, ErrorMessage = "Descrição não pode ter mais que 400 caracteres")]
    public string Description { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "Valor é obrigatório")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Valor deve ser positivo")]
    public decimal Amount { get; set; }
    
    [Required(ErrorMessage = "Tipo de Transação é obrigatório")]
    public TransactionType TransactionType { get; set; }
    
    [Required(ErrorMessage = "Pessoa é obrigatória")]
    public Guid PersonId { get; set; }
    
    [Required(ErrorMessage = "Categoria é obrigatória")]
    public Guid CategoryId { get; set; }

    public Person Person { get; set; } = null!;
    public Category Category { get; set; } = null!;
}