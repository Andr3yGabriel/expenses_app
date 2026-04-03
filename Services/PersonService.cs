using expenses_api.DTOs.Person;
using expenses_api.Infrastructure;
using expenses_api.Models;
using expenses_api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace expenses_api.Services;

public class PersonService(ConnectionContext db) : IPersonService
{
    public async Task<IEnumerable<PersonResponseDto>> GetAllAsync()
    {
        return await db.Persons
            .AsNoTracking()
            .Select(p => ToResponseDto(p))
            .ToListAsync();
    }

    public async Task<PersonResponseDto?> GetByIdAsync(Guid id)
    {
        var person = await db.Persons.AsNoTracking()
                             .FirstOrDefaultAsync(p => p.PersonId == id);
        
        return person is null ? null : ToResponseDto(person);
    }

    public async Task<PersonResponseDto> CreateAsync(PersonRequestDto dto)
    {
        var person = new Person
        {
            Name = dto.Name,
            Age = dto.Age
        };
        
        db.Persons.Add(person);
        await db.SaveChangesAsync();
        
        return ToResponseDto(person);
    }

    public async Task<PersonResponseDto?> UpdateAsync(Guid id, PersonRequestDto dto)
    {
        var person = await db.Persons.FindAsync(id);
        
        if (person is null) return null;
        
        person.Name = dto.Name;
        person.Age = dto.Age;
        
        await db.SaveChangesAsync();
        return ToResponseDto(person);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var person = await db.Persons.FindAsync(id);
        
        if (person is null) return false;
        
        db.Persons.Remove(person);
        await db.SaveChangesAsync();
        
        return true;
    }

    public async Task<PersonTotalsResponseDto> GetTotalsAsync()
    {
        var persons = await db.Persons
            .AsNoTracking()
            .Include(p => p.Transactions)
            .ToListAsync();

        var summaries = persons.Select(p => new PersonSummaryDto
        {
            PersonId = p.PersonId,
            Name = p.Name,
            Income = p.Transactions
                      .Where(t => t.TransactionType == TransactionType.Receita)
                      .Sum(t => t.Amount),
            Expense = p.Transactions
                      .Where(t => t.TransactionType == TransactionType.Despesa)
                      .Sum(t => t.Amount)
        }).ToList();

        return new PersonTotalsResponseDto
        {
            Persons = summaries,
            TotalIncome = summaries.Sum(s => s.Income),
            TotalExpense = summaries.Sum(s => s.Expense)
        };
    }
    
    private static PersonResponseDto ToResponseDto(Person p) => new()
    {
        Id   = p.PersonId,
        Name = p.Name,
        Age  = p.Age
    };
}