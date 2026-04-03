namespace expenses_api.DTOs.Person;

public class PersonTotalsResponseDto
{
    public IEnumerable<PersonSummaryDto> Persons { get; set; } = [];
    public decimal TotalIncome { get; set; }
    public decimal TotalExpense { get; set; }
    public decimal NetBalance => TotalIncome - TotalExpense;
}