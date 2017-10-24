using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace BookLogger.API.Models
{
    public class ReaderRepository
    {

        /// <summary>
        /// Creates a new reader with default values
        /// </summary>
        /// <returns></returns>
        internal Reader Create()
        {
            Reader reader = new Reader();
            return reader;
        }

        /// <summary>
        /// Retrieves the list of readers.
        /// </summary>
        /// <returns></returns>
        internal List<Reader> Retrieve()
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/readers.json");

            var json = System.IO.File.ReadAllText(filePath);

            var readers = JsonConvert.DeserializeObject<List<Reader>>(json);

            return readers;
        }

        /// <summary>
        /// Saves a new reader.
        /// </summary>
        /// <param name="reader"></param>
        /// <returns></returns>
        internal Reader Save(Reader reader)
        {
            // Read in the existing products
            var readers = this.Retrieve();

            // Assign a new Id
            var maxId = readers.Max(p => p.ReaderId);
            reader.ReaderId = maxId + 1;
            readers.Add(reader);

            WriteData(readers);

            return reader;
        }

        /// <summary>
        /// Updates an existing product
        /// </summary>
        /// <param name="id"></param>
        /// <param name="reader"></param>
        /// <returns></returns>
        internal Reader Save(int id, Reader reader)
        {
            // Read in the existing products
            var readers = this.Retrieve();

            // Locate and replace the item
            var itemIndex = readers.FindIndex(p => p.ReaderId == reader.ReaderId);

            if (itemIndex > 0)
            {
                readers[itemIndex] = reader;
            }
            else
            {
                return null;
            }

            WriteData(readers);
            return reader;
        }

        private bool WriteData(List<Reader> readers)
        {
            // Write out the Json
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/readers.json");

            var json = JsonConvert.SerializeObject(readers, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, json);

            return true;
        }
    }
}