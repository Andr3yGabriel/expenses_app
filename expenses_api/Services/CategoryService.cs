using expenses_api.DTOs.Category;
using expenses_api.Infrastructure;
using expenses_api.Models;
using expenses_api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace expenses_api.Services;

public class CategoryService(ConnectionContext db) : ICategoryService
{
    public async Task<IEnumerable<CategoryResponseDto>> GetAllAsync()
    {
        return await db.Categories
            .AsNoTracking()
            .Select(c => ToResponseDto(c))
            .ToListAsync();
    }
    
    public async Task<CategoryResponseDto> CreateAsync(CategoryRequestDto dto)
    {
        var category = new Category
        {
            Description = dto.Description,
            Finalidade  = dto.Finalidade
        };

        db.Categories.Add(category);
        await db.SaveChangesAsync();

        return ToResponseDto(category);
    }

    public async Task<CategoryTotalsResponseDto> GetTotalsAsync()
    {
        var categories = await db.Categories
            .AsNoTracking()
            .Include(c => c.Transactions)
            .ToListAsync();

        var summaries = categories.Select(c => new CategorySummaryDto
        {
            CategoryId = c.CategoryId,
            Description = c.Description,
            Finalidade = c.Finalidade,
            Income = c.Finalidade != Finalidade.Despesa 
                ? c.Transactions
                    .Where(t => t.TransactionType == TransactionType.Receita)
                    .Sum(t => t.Amount)
                : 0,
            Expense = c.Finalidade != Finalidade.Receita 
                ? c.Transactions
                    .Where(t => t.TransactionType == TransactionType.Despesa)
                    .Sum(t => t.Amount)
                : 0,
        })
        .Where(c => c.Income > 0 || c.Expense > 0)
        .ToList();

        return new CategoryTotalsResponseDto
        {
            Categories = summaries,
            TotalIncome = summaries.Sum(s => s.Income),
            TotalExpense = summaries.Sum(s => s.Expense)
        };
    }

    private static CategoryResponseDto ToResponseDto(Category c) => new()
    {
        CategoryId  = c.CategoryId,
        Description = c.Description,
        Finalidade  = c.Finalidade
    };
}