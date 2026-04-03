using expenses_api.DTOs.Person;
using expenses_api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace expenses_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonsController(IPersonService personService) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<PersonResponseDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
    {
        var persons = await personService.GetAllAsync();
        return Ok(persons);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(PersonResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var person = await personService.GetByIdAsync(id);
        return person is null ? NotFound() : Ok(person);
    }

    [HttpGet("totals")]
    [ProducesResponseType(typeof(PersonTotalsResponseDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetTotals()
    {
        var totals = await personService.GetTotalsAsync();
        return Ok(totals);
    }

    [HttpPost]
    [ProducesResponseType(typeof(PersonResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] PersonRequestDto dto)
    {
        var created = await personService.CreateAsync(dto);
        
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(PersonResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Update(Guid id, [FromBody] PersonRequestDto dto)
    {
        var updated = await personService.UpdateAsync(id, dto);
        return Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await personService.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}