using System;
using System.Collections.Generic;

namespace CarStorageApi.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class Car
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        public Guid Id { get; set; }
        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        public string Name { get; set; } = "";
        /// <summary>
        /// Gets or sets the type.
        /// </summary>
        /// <value>
        /// The type.
        /// </value>
        public string Type { get; set; }
        /// <summary>
        /// Gets or sets the color.
        /// </summary>
        /// <value>
        /// The color.
        /// </value>
        public string Color { get; set; } = "";
        /// <summary>
        /// Gets or sets the created date.
        /// </summary>
        /// <value>
        /// The created date.
        /// </value>
        public DateTime? CreatedDate { get; set; }
        /// <summary>
        /// Gets or sets the sold date.
        /// </summary>
        /// <value>
        /// The sold date.
        /// </value>
        public DateTime? SoldDate { get; set; }
        /// <summary>
        /// Gets or sets the part.
        /// </summary>
        /// <value>
        /// The part.
        /// </value>
        public virtual List<Part> Part { get; set; } = new List<Part>();
    }
}
