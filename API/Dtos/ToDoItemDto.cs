using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class ToDoItemDto
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "ToDo is mandatory")]
        public string ToDo { get; set; }
        public int LabelId { get; set; }
        public int StatusId { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "DueDate is mandatory")]
        public DateTimeOffset DueDate { get; set; }
    }
}
