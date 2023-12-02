namespace DragAndDrop.WebApi.Models;

public sealed class Todo
{
    public int Id { get; set; }
    public string Work { get; set; }
    public Boolean isCompleted { get; set; }
    public DateTime CreatAt { get; set; }



}
