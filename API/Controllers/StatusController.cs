using System.Collections.Generic;
using System.Threading.Tasks;
using Infrastructure;
using Infrastructure.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly ToDoContext _toDoContext;

        public StatusController(ToDoContext toDoContext)
        {
            _toDoContext = toDoContext;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Status>>> GetStatus()
        {
            var statuses = await _toDoContext.Statuses.ToListAsync();
            return Ok(statuses);
        }
    }
}