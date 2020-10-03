using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Infrastructure;
using Infrastructure.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ToDoContext _toDoContext;
        private readonly IMapper _mapper;

        public TasksController(ToDoContext toDoContext, IMapper mapper)
        {
            _toDoContext = toDoContext;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<ToDoItem>> CreateTask(ToDoItemDto toDoItemDto)
        {
            if (ModelState.IsValid)
            {
                ToDoItem toDoItem = _mapper.Map<ToDoItem>(toDoItemDto);
                toDoItem.CreateDt = DateTime.UtcNow;
                await _toDoContext.AddAsync(toDoItem);
                var output = await _toDoContext.SaveChangesAsync();
                if (output > 0)
                {
                    return Ok(toDoItem);
                }
            }

            return BadRequest("Some error happened");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ToDoItem>> UpdateTask(int id, ToDoItemDto toDoItemDto)
        {
            if (ModelState.IsValid)
            {
                var toDoItem = await _toDoContext.ToDoItems.FindAsync(id);
                if (toDoItem != null)
                {
                    toDoItem.DueDate = toDoItemDto.DueDate;
                    toDoItem.LabelId = toDoItemDto.LabelId;
                    toDoItem.StatusId = toDoItemDto.StatusId;
                    toDoItem.ToDo = toDoItemDto.ToDo;
                    toDoItem.DueDate = toDoItemDto.DueDate;
                    toDoItem.UpdateDt = DateTime.UtcNow;
                    _toDoContext.Attach(toDoItem);
                    _toDoContext.Entry(toDoItem).State = EntityState.Modified;
                    var output = await _toDoContext.SaveChangesAsync();
                    if (output > 0)
                    {
                        return Ok(toDoItem);
                    }
                }
                return BadRequest("Item not found");
            }

            return BadRequest("Some error happened");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ToDoItem>> DeleteTask(int id)
        {
            if (ModelState.IsValid)
            {
                var toDoItem = await _toDoContext.ToDoItems.FindAsync(id);
                _toDoContext.Remove(toDoItem);
                var output = await _toDoContext.SaveChangesAsync();
                if (output > 0)
                {
                    return Ok("ToDo deleted successfully");
                }
            }

            return BadRequest("Some error happened");
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ToDoItem>>> GetTasks(DateTimeOffset? dueDate, int? statusId, int? labelID)
        {
            if (ModelState.IsValid)
            {
                var toDoItem = await _toDoContext.ToDoItems.Where(a =>
                (dueDate != null ? a.DueDate.Date == dueDate.Value.Date : true) &&
                (labelID != null ? a.LabelId == labelID : true) &&
                (statusId != null ? a.StatusId == statusId : true)).ToListAsync();
                return Ok(toDoItem);
            }

            return BadRequest("Some error happened");
        }
    }
}