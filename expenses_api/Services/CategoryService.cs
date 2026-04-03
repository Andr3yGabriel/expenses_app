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

    private static CategoryResponseDto ToResponseDto(Category c) => new()
    {
        CategoryId  = c.CategoryId,
        Description = c.Description,
        Finalidade  = c.Finalidade
    };
}