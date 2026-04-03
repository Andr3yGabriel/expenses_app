using expenses_api.DTOs.Category;

namespace expenses_api.Services.Interfaces;

public interface ICategoryService
{
    Task<IEnumerable<CategoryResponseDto>> GetAllAsync();
    Task<CategoryResponseDto> CreateAsync(CategoryRequestDto dto);
}