using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Back_Estoque.Data;
using Back_Estoque.Models;
using Microsoft.AspNetCore.Authorization;

namespace Back_Estoque.Controller
{
    [Authorize("Bearer")]
    [Route("[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ProductsModels
        [HttpGet]
        [Route("list")]
        public async Task<ActionResult<IEnumerable<ProductsModel>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/ProductsModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductsModel>> GetProductsModel(int id)
        {
            var productsModel = await _context.Products.FindAsync(id);

            if (productsModel == null)
            {
                return NotFound();
            }

            return productsModel;
        }

        // PUT: api/ProductsModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductsModel(int id, ProductsModel productsModel)
        {
            if (id != productsModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(productsModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ProductsModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<ProductsModel>> PostProductsModel(ProductsModel productsModel)
        {
            _context.Products.Add(productsModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductsModel", new { id = productsModel.Id }, productsModel);
        }

        // DELETE: api/ProductsModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductsModel(int id)
        {
            var productsModel = await _context.Products.FindAsync(id);
            if (productsModel == null)
            {
                return NotFound();
            }

            _context.Products.Remove(productsModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductsModelExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
