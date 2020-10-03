import { Component, OnInit } from '@angular/core';
import { IToDo } from 'src/app/models/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  toDoList: IToDo[];
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getToDoList();
  }
  getToDoList(): void {
    this.todoService.getToDoList()
      .subscribe(
        (response: IToDo[]) => {
          this.toDoList = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
