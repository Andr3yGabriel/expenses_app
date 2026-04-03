namespace expenses_api.DTOs.Person;

public class PersonSummaryDto
{
    public Guid PersonId { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Income { get; set; }
    public decimal Expense { get; set; }
    public decimal Balance => Income - Expense;
}