using expenses_api.DTOs.Transaction;
using expenses_api.Infrastructure;
using expenses_api.Models;
using expenses_api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace expenses_api.Services;

public class TransactionService(ConnectionContext db) : ITransactionService
{
    public async Task<IEnumerable<TransactionResponseDto>> GetAllAsync()
    {
        return await db.Transactions
            .AsNoTracking()
            .Include(t => t.Person)
            .Include(t => t.Category)
            .Select(t => ToResponseDto(t))
            .ToListAsync();
    }

    
    public async Task<TransactionResponseDto> CreateAsync(TransactionRequestDto dto)
    {
        var person = await db.Persons.FindAsync(dto.PersonId)
            ?? throw new KeyNotFoundException("Pessoa não encontrada.");

        var category = await db.Categories.FindAsync(dto.CategoryId)
            ?? throw new KeyNotFoundException("Categoria não encontrada.");
        
        if (person.Age < 18 && dto.TransactionType == TransactionType.Receita)
            throw new InvalidOperationException(
                "Menores de 18 anos só podem registrar despesas.");
        
        var categoriaIncompativel =
            (dto.TransactionType == TransactionType.Despesa &&
             category.Finalidade == Finalidade.Receita)
            ||
            (dto.TransactionType == TransactionType.Receita &&
             category.Finalidade == Finalidade.Despesa);

        if (categoriaIncompativel)
            throw new InvalidOperationException(
                $"A categoria '{category.Description}' não é compatível com " +
                $"transações do tipo '{dto.TransactionType}'.");

        var transaction = new Transaction
        {
            Description     = dto.Description,
            Amount          = dto.Amount,
            TransactionType = dto.TransactionType,
            PersonId        = dto.PersonId,
            CategoryId      = dto.CategoryId
        };

        db.Transactions.Add(transaction);
        await db.SaveChangesAsync();
        
        transaction.Person   = person;
        transaction.Category = category;

        return ToResponseDto(transaction);
    }

    private static TransactionResponseDto ToResponseDto(Transaction t) => new()
    {
        TransactionId   = t.TransactionId,
        Description     = t.Description,
        Amount          = t.Amount,
        TransactionType = t.TransactionType,
        PersonId        = t.PersonId,
        PersonName      = t.Person.Name,
        CategoryId      = t.CategoryId,
    };
}