using System.ComponentModel.DataAnnotations;
using expenses_api.Models;

namespace expenses_api.DTOs.Category;

public class CategoryRequestDto
{
    [Required(ErrorMessage = "Descrição é obrigatória")]
    [MaxLength(400, ErrorMessage = "Descrição deve conter no máximo 400 caracteres")]
    public string Description { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "Finalidade é obrigatória")]
    public Finalidade Finalidade { get; set; }
}