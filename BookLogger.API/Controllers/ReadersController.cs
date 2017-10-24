using BookLogger.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace BookLogger.API.Controllers
{
    [EnableCors(origins: "http://localhost:54863", headers: "*", methods: "*")]
    public class ReadersController : ApiController
    {
        //GET: api/Books
        [ResponseType(typeof(Reader))]
        public IHttpActionResult Get()
        {
            try
            {
                var readerRepository = new ReaderRepository();
                var readers = readerRepository.Retrieve().AsQueryable();
                return Ok(readers);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //GET: api/Books/5
        [Authorize]
        [ResponseType(typeof(Reader))]
        public IHttpActionResult Get([FromUri]int id)
        {
            try
            {
                //throw new ArgumentNullException("this is a test");
                Reader reader;
                var readerRepository = new ReaderRepository();

                if (id > 0)
                {
                    var readers = readerRepository.Retrieve();
                    reader = readers.FirstOrDefault(p => p.ReaderId == id);
                    if (reader == null)
                        return NotFound();
                }
                else
                {
                    reader = readerRepository.Create();
                }

                return Ok(reader);

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //POST: api/Products
        public IHttpActionResult Post([FromBody] Reader reader)
        {
            try
            {
                if (reader == null)
                    return BadRequest("Reader cannot be null");

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var readerRepository = new ReaderRepository();
                var newReader = readerRepository.Save(reader);

                if (newReader == null)
                    return Conflict();

                var requestUri = Request.RequestUri;
                var newReaderId = newReader.ReaderId.ToString();
                var location = requestUri + newReaderId;

                return Created<Reader>(location, newReader);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //PUT: api/Books/5
        public IHttpActionResult Put([FromUri] int id, [FromBody] Reader reader)
        {
            try
            {
                if (reader == null)
                    return BadRequest("Reader cannot be null");

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var readerRepository = new ReaderRepository();
                var updateReader = readerRepository.Save(id, reader);

                if (updateReader == null)
                    return NotFound();

                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //DELETE: api/Books/5
        public IHttpActionResult Delete([FromUri] int id)
        {
            try
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
