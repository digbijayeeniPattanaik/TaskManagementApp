using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class ToDoItemDto
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "ToDo is mandatory")]
        public string ToDo { get; set; }
        public string Label { get; set; }
        public string Status { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "DueDate is mandatory")]
        public DateTimeOffset DueDate { get; set; }
    }
}
