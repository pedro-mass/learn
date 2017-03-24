using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.OData;
using APM.WebAPI.Models;

namespace APM.WebAPI.Controllers
{
    [EnableCors("*","*","*")]
    public class ProductsController : ApiController
    {
        // GET: api/Products        
        [EnableQuery()]
        public IHttpActionResult Get()
        {
            var repo = new ProductRepository();
            return Ok(repo.Retrieve().AsQueryable());
        }

        // GET: api/Products/5
        public IHttpActionResult Get(int id)
        {
            Product product;
            var productRepo = new ProductRepository();

            if (id > 0)
            {
                var products = productRepo.Retrieve();  // this is not effecient, you should query the db directly
                product = products.FirstOrDefault(p => p.ProductId == id);

                if (product == null)
                {
                    return NotFound();
                }
            }
            else
            {
                product = productRepo.Create();
            }

            return Ok(product);
        }

        // POST: api/Products
        public IHttpActionResult Post([FromBody]Product product)
        {
            if (product == null)
            {
                return BadRequest("Product cannot be null");
            }

            var repo = new ProductRepository();
            var newProduct = repo.Save(product);
            if (newProduct == null)
            {
                return Conflict();
            }

            return Created<Product>(Request.RequestUri + newProduct.ProductId.ToString(), newProduct);
        }

        // PUT: api/Products/5
        public IHttpActionResult Put(int id, [FromBody]Product product)
        {
            if (product == null)
            {
                return BadRequest("Product cannot be null");
            }

            var repo = new ProductRepository();
            var updatedProduct = repo.Save(id, product);
            if (updatedProduct == null)
            {
                return NotFound();
            }

            return Ok();
        }

        // DELETE: api/Products/5
        public void Delete(int id)
        {
        }
    }
}
