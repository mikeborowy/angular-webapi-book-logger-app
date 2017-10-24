using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace BookLogger.API.Models
{
    public class BooksRepository
    {
        /// <summary>
        /// Creates a new book with default values
        /// </summary>
        /// <returns></returns>
        internal Book Create()
        {
            Book book = new Book
            {
                YearPublished = new DateTime().Year
            };
            return book;
        }

        /// <summary>
        /// Retrieves the list of books.
        /// </summary>
        /// <returns></returns>
        internal List<Book> Retrieve()
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/books.json");

            var json = System.IO.File.ReadAllText(filePath);

            var books = JsonConvert.DeserializeObject<List<Book>>(json);

            return books;
        }

        /// <summary>
        /// Saves a new book.
        /// </summary>
        /// <param name="book"></param>
        /// <returns></returns>
        internal Book Save(Book book)
        {
            // Read in the existing products
            var books = this.Retrieve();

            // Assign a new Id
            var maxId = books.Max(p => p.BookId);
            book.BookId = maxId + 1;
            books.Add(book);

            WriteData(books);

            return book;
        }

        /// <summary>
        /// Updates an existing product
        /// </summary>
        /// <param name="id"></param>
        /// <param name="book"></param>
        /// <returns></returns>
        internal Book Save(int id, Book book)
        {
            // Read in the existing products
            var books = this.Retrieve();

            // Locate and replace the item
            var itemIndex = books.FindIndex(p => p.BookId == book.BookId);

            if (itemIndex > 0)
            {
                books[itemIndex] = book;
            }
            else
            {
                return null;
            }

            WriteData(books);
            return book;
        }

        internal List<Book> Delete(int id)
        {
            // Read in the existing products
            var books = this.Retrieve();

            // Assign a new Id
            var book = books.FirstOrDefault(p => p.BookId == id);

            if (book != null)
                books.Remove(book);
            else
                return null;

            WriteData(books);

            return books;
        }

        private bool WriteData(List<Book> books)
        {
            // Write out the Json
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/books.json");

            var json = JsonConvert.SerializeObject(books, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, json);

            return true;
        }
    }
}