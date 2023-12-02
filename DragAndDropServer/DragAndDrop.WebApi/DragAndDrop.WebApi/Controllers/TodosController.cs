using DragAndDrop.WebApi.AppDbContext;
using DragAndDrop.WebApi.Dtos;
using DragAndDrop.WebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DragAndDrop.WebApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class TodosController : ControllerBase
{

    TodoDbContext context = new();



    //public static List<Todo> Todos = new()
    //{

        //new Todo{ Id =1,Work= "Get to work", isCompleted= false },
        //new Todo{ Id =2,Work= "Pick up groceries", isCompleted= false },
        //new Todo{ Id =3,Work= "Go home", isCompleted= false },
        //new Todo{ Id =4,Work= "Fall asleep", isCompleted= true },
        //new Todo{ Id =5,Work= "Brush teeth", isCompleted= true },
        //new Todo{ Id =6,Work= "Check e-mail", isCompleted= true }

    //};


    [HttpGet]
    public IActionResult getAll() { 
    

         try
         {
         var Todos = context.Todos.ToList();
        
             return Ok(Todos);
         }
         catch(Exception ex) { 
        
            return BadRequest(ex.Message);
            }
        

    }


    [HttpGet("{id}")]
    public IActionResult ChangeCompleted(int id)
    {

        var todo = context.Todos.Where(o => o.Id == id).FirstOrDefault();
        if (todo is null)
        {

            return NotFound();

        }
        todo.isCompleted = !todo.isCompleted;
        context.SaveChanges();

        return Ok(todo.isCompleted);

    }


    [HttpPost]
    public IActionResult CreateTodo(CreateTodoRequestDto request)
    {


        var isSameWork = context.Todos.Any(o => o.Work.ToLower() == request.Work.ToLower());

        if (isSameWork)
        {

            return BadRequest("Daha Önce Oluşturulmuş !");

        }

        var newTodo = new Todo
        {
            Work = request.Work,
            isCompleted = false,
            CreatAt = DateTime.Now


        };

          context.Todos.Add(newTodo);
        context.SaveChanges();
           



      

        return Ok();

    }

    [HttpGet("{id}")]
    public IActionResult RemoveById(int id)
    {

        var filteredTodo = context.Todos.Find(id);

        if(filteredTodo is null)
        {
            return NotFound("Todo Bulunamadı !");
        }

      
        context.Todos.Remove(filteredTodo);
        context.SaveChanges();


        return NoContent();
    }



    [HttpPost]
    public IActionResult UpdateById(UpdateTodoRequestDto request) {



        Todo isThere = context.Todos.FirstOrDefault(o => o.Id == request.id);
        
        if (isThere is null)
        {

            return NotFound();

        }

        isThere.Work = request.Work;
        context.SaveChanges();


        return Ok();
    }




}