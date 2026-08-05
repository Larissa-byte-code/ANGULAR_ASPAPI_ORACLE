/*
using Microsoft.AspNetCore.Mvc;
using SmarketApiOracle.Models;
using SmarketApiOracle.Services;

namespace SmarketApiOracle.Controllers
{

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private readonly CategoryService _service;

    public Gestion_Retour(CategoryService service)
        {
             _service = service;
        }
    // GET api/items/5
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var item = _service.GetById(id);
        if (item == null)
            return NotFound("Item non trouvé"); // 404
        return Ok(item); // 200
    }

    // POST api/items
    [HttpPost]
    public IActionResult Create([FromBody] TblCategory category)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState); // 400

        var item = _service.Create(category);
        return CreatedAtAction(nameof(Get), new { id = item.Id }, item); // 201
    }

    // PUT api/items/5
    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] TblCategory category)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState); // 400

        var updated = _service.Update(id, category);
        if (updated == null)
            return NotFound("Item non trouvé"); // 404

        return Ok(updated); // 200
    }

    // DELETE api/items/5
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        try
        {
            bool deleted = _service.Delete(id);
            if (!deleted)
                return NotFound("Item non trouvé"); // 404

            return NoContent(); // 204
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Erreur interne : " + ex.Message); // 500
        }
    }
}
}
*/