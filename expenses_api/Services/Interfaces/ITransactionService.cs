using expenses_api.DTOs.Transaction;

namespace expenses_api.Services.Interfaces;

public interface ITransactionService
{
    Task<IEnumerable<TransactionResponseDto>> GetAllAsync();
    Task<TransactionResponseDto> CreateAsync(TransactionRequestDto dto);
}