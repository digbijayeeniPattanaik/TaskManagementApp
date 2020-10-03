using System;

namespace Infrastructure.Model
{
    public class ToDoItem : BaseEntity
    {
        public string ToDo { get; set; }
        public int LabelId { get; set; }
        public int StatusId { get; set; }
        public DateTimeOffset DueDate { get; set; }
        public DateTimeOffset CreateDt { get; set; }
        public DateTimeOffset? UpdateDt { get; set; }
        public string UserEmail { get; set; }

        public Label Label { get; set; }
        public Status Status { get; set; }
    }
}
