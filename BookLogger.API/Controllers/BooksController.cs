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
    public class BooksController : ApiController
    {
        //GET: api/Books
        [ResponseType(typeof(Book))]
        public IHttpActionResult Get()
        {
            try
            {
                var booksRepository = new BooksRepository();
                var books = booksRepository.Retrieve().AsQueryable();
                return Ok(books);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //GET: api/Books/5
        [ResponseType(typeof(Book))]
        public IHttpActionResult Get([FromUri]int id)
        {
            try
            {
                //throw new ArgumentNullException("this is a test");
                Book book;
                var booksRepository = new BooksRepository();

                if (id > 0)
                {
                    var books = booksRepository.Retrieve();
                    book = books.FirstOrDefault(p => p.BookId == id);
                    if (book == null)
                        return NotFound();
                }
                else
                {
                    book = booksRepository.Create();
                }

                return Ok(book);

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //POST: api/Products
        public IHttpActionResult Post([FromBody] Book book)
        {
            try
            {
                if (book == null)
                    return BadRequest("Book cannot be null");

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var booksRepository = new BooksRepository();
                var newBook = booksRepository.Save(book);

                if (newBook == null)
                    return Conflict();

                var requestUri = Request.RequestUri;
                var newBookId = newBook.BookId.ToString();
                var location = requestUri + newBookId;

                return Created<Book>(location, newBook);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //PUT: api/Books/5
        public IHttpActionResult Put([FromUri] int id, [FromBody] Book book)
        {
            try
            {
                if (book == null)
                    return BadRequest("Book cannot be null");

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var booksRepository = new BooksRepository();
                var updateBook = booksRepository.Save(id, book);

                if (updateBook == null)
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
                var booksRepository = new BooksRepository();
                var deleteBook = booksRepository.Delete(id);

                if (deleteBook == null)
                    return NotFound();

                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
