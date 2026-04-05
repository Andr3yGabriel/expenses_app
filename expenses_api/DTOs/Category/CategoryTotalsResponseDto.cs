namespace expenses_api.DTOs.Category;

public class CategoryTotalsResponseDto
{
    public IEnumerable<CategorySummaryDto> Categories { get; set; } = [];
    public decimal TotalIncome  { get; set; }
    public decimal TotalExpense { get; set; }
    public decimal NetBalance => TotalIncome - TotalExpense;
}