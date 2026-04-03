using expenses_api.Models;

namespace expenses_api.DTOs.Transaction;

public class TransactionResponseDto
{
    public Guid TransactionId { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public TransactionType TransactionType { get; set; }
    
    public Guid PersonId { get; set; }
    public string PersonName { get; set; } = string.Empty;
    public Guid CategoryId { get; set; }
}