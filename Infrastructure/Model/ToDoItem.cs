using System;

namespace Infrastructure.Model
{
    public class ToDoItem : BaseEntity
    {
        public string ToDo { get; set; }
        public string Label { get; set; }
        public string Status { get; set; }
        public DateTimeOffset DueDate { get; set; }
        public DateTimeOffset CreateDt { get; set; }
        public DateTimeOffset? UpdateDt { get; set; }
        public string UserEmail { get; set; }
    }
}
