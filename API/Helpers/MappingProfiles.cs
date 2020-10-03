using API.Dtos;
using AutoMapper;
using Infrastructure.Model;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ToDoItem, ToDoItemDto>()
                .ReverseMap();
        }
    }
}
