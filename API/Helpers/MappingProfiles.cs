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
                .ForMember(a => a.LabelId, o => o.MapFrom(b => b.LabelId))
                .ForMember(a => a.StatusId, o => o.MapFrom(b => b.StatusId))
                .ReverseMap();
        }
    }
}
