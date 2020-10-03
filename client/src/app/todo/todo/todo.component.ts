import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IToDo } from 'src/app/models/todo';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  toDoList: IToDo[];
  constructor(private todoService: TodoService,
    private router: Router ) { }

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

  deleteTask(id:number): void{
this.todoService.deleteTask(id)
.subscribe(
  (response) =>{
    console.log(response);
    console.log("loading again");
    this.getToDoList();
  },
  (error) => {
    console.error(error);
    this.getToDoList();
  }
)

  }
}
