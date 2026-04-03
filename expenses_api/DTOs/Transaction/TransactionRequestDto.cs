using System.ComponentModel.DataAnnotations;
using expenses_api.Models;

namespace expenses_api.DTOs.Transaction;

public class TransactionRequestDto
{
    [Required(ErrorMessage = "Descrição é obrigatória")]
    [MaxLength(400, ErrorMessage = "Descrição não deve conter mais que 400 caracteres")]
    public string Description { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "Valor é obrigatório")]
    [Range(0.01, double.MaxValue, ErrorMessage = "O Valor deve positivo")]
    public decimal Amount { get; set; }
    
    [Required(ErrorMessage = "Tipo de transação é obrigatório")]
    public TransactionType TransactionType { get; set; }
    
    [Required(ErrorMessage = "Pessoa é obrigatória")]
    public Guid PersonId { get; set; }
    
    [Required(ErrorMessage = "Categoria é obrigatória")]
    public Guid CategoryId { get; set; }
}