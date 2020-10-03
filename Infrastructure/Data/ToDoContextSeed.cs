using Infrastructure.Model;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class ToDoContextSeed
    {
        public static async Task SeedAsync(ToDoContext toDoContext, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!toDoContext.Labels.Any())
                {
                    var labelData = File.ReadAllText("../Infrastructure/Data/SeedData/labelData.json");
                    var labels = JsonConvert.DeserializeObject<List<Label>>(labelData);

                    toDoContext.Labels.AddRange(labels);
                    await toDoContext.SaveChangesAsync();
                }

                if (!toDoContext.Statuses.Any())
                {
                    var statusData = File.ReadAllText("../Infrastructure/Data/SeedData/statusData.json");
                    var statuses = JsonConvert.DeserializeObject<List<Status>>(statusData);

                    toDoContext.Statuses.AddRange(statuses);
                    await toDoContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<ToDoContextSeed>();
                logger.LogError(ex, "Failed while seeding");
            }
        }
    }
}
