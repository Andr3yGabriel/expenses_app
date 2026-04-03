using System.ComponentModel.DataAnnotations;
using expenses_api.Models;

namespace expenses_api.DTOs.Category;

public class CategoryResponseDto
{
    public Guid CategoryId { get; set; }
    public string Description { get; set; } = string.Empty;
    public Finalidade Finalidade { get; set; }
}