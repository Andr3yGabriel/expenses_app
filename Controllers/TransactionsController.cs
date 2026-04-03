// Controllers/TransactionsController.cs
using expenses_api.DTOs.Transaction;
using expenses_api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace expenses_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController(ITransactionService transactionService) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<TransactionResponseDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
    {
        var transactions = await transactionService.GetAllAsync();
        return Ok(transactions);
    }
    
    [HttpPost]
    [ProducesResponseType(typeof(TransactionResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> Create([FromBody] TransactionRequestDto dto)
    {
        var created = await transactionService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetAll), created);
    }
}