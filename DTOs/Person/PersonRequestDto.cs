using System.ComponentModel.DataAnnotations;

namespace expenses_api.DTOs.Person;

public class PersonRequestDto
{
    [Required(ErrorMessage = "Nome é obrigatório")]
    [MaxLength(200, ErrorMessage = "Nome deve conter no máximo 200 caracteres")]
    public string Name { get; set; } =  string.Empty;
    
    [Required(ErrorMessage = "Idade é obrigatória")]
    [Range(0, 130, ErrorMessage = "Idade deve estar entre 0 e 130")]
    public int Age { get; set; }
}