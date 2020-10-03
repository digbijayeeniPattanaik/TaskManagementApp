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
    public class LabelsController : ControllerBase
    {
        private readonly ToDoContext _toDoContext;

        public LabelsController(ToDoContext toDoContext)
        {
            _toDoContext = toDoContext;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Label>>> GetLabels()
        {
            var labels = await _toDoContext.Labels.ToListAsync();
            return Ok(labels);
        }
    }
}