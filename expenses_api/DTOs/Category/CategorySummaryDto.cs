using expenses_api.Models;

namespace expenses_api.DTOs.Category;

public class CategorySummaryDto
{
    public Guid CategoryId { get; set; }
    public string Description { get; set; } =  string.Empty;
    public Finalidade Finalidade { get; set; }
    public decimal Income { get; set; }
    public decimal Expense { get; set; }
    public decimal Balance => Income - Expense;
}