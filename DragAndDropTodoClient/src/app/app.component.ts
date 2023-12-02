import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { TodoModel } from './models/todo.model';
import { HttpClient } from '@angular/common/http';
import { RequestModel } from './models/request.model';
import { ToastrsService } from './Services/toastrs.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'DragAndDropTodoClient';
  
  todo: TodoModel[] = []
  done: TodoModel[] = []
  todos: TodoModel[] = []
  showAddForm = false;
  editForm = false
  request: RequestModel = new RequestModel()



  constructor(public http: HttpClient,
    private toastr: ToastrsService) {

    this.splitTodosToDoAnDone()
    this.getAll()
  }




  showEditForm(item: TodoModel) {
    this.editForm = true;
    this.showAddForm = false;
    this.request.id = item.id;
    this.request.work = item.work;
  }

  closeEditForm() {
    this.editForm = false
  }




  updateTodo() {
    this.http.post('https://localhost:7049/api/Todos/UpdateById', this.request)
      .subscribe(res => {

        this.getAll();
        this.toastr.showSuccess('Güncellendi');
      });
    this.request.work = ""
  }


  splitTodosToDoAnDone() {

    this.todo = []
    this.done = []

    for (var item of this.todos) {

      if (item.isCompleted === true) {

        this.done.push(item)
      }
      else {
        this.todo.push(item)
      }

    }

  }


  getAll() {

    this.http.get<TodoModel[]>('https://localhost:7049/api/Todos/getAll')
      .subscribe(res => {

        this.todos = res

        this.splitTodosToDoAnDone()
      })




  }


  addTodo() {
    this.http.post('https://localhost:7049/api/Todos/CreateTodo', this.request)
      .subscribe(
        () => {
          this.request.work = '';
          this.getAll();
          this.toastr.showSuccess('Eklendi');
        },
        (err) => {
          this.toastr.showError('Aynı Görev Eklenemez !');

        }
      );
  }

  deleteTodo(i: number) {

    this.http.get(`https://localhost:7049/api/Todos/RemoveById/${i}`)
      .subscribe(res => {

        this.toastr.showError('silindi')
        this.getAll()

      })

  }

  showForm() {
    this.showAddForm = true;
    this.editForm = false
  }


  //TO-DO
  drop1(event: CdkDragDrop<TodoModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {


      const id = this.done[event.previousIndex].id
      this.todos.filter(o => o.id === id)[0].isCompleted = false
      this.changeCompleted(id)


    }
  }


  changeCompleted(id: number) {

    this.http.get(`https://localhost:7049/api/Todos/ChangeCompleted/ ${id}`)
      .subscribe(res => {

        this.getAll()

      })

  }


  //DONE
  drop2(event: CdkDragDrop<TodoModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {


      const id = this.todo[event.previousIndex].id
      this.changeCompleted(id)


    }
  }


}
