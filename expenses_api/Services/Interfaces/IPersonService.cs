using expenses_api.DTOs.Person;

namespace expenses_api.Services.Interfaces;

public interface IPersonService
{
    Task<IEnumerable<PersonResponseDto>> GetAllAsync();
    Task<PersonResponseDto?> GetByIdAsync(Guid id);
    Task<PersonResponseDto> CreateAsync(PersonRequestDto dto);
    Task<PersonResponseDto?> UpdateAsync(Guid id, PersonRequestDto dto);
    Task<bool> DeleteAsync(Guid id);
    Task<PersonTotalsResponseDto> GetTotalsAsync();
}