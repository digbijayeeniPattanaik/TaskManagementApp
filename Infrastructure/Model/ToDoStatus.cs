using System.Runtime.Serialization;

namespace Infrastructure.Model
{
    public enum ToDoStatus
    {
        [EnumMember(Value = "New")]
        New,
        [EnumMember(Value = "In Progress")]
        InProgress,
        [EnumMember(Value = "Completed")]
        Completed
    }
}
