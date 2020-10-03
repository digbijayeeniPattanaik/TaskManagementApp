import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ILabels, IStatus, IToDo } from 'src/app/models/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss'],
})
export class TodoCreateComponent implements OnInit {
  toDoForm: FormGroup;
  labels: ILabels[];
  statuses: IStatus[];
  todo: IToDo;
  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {
    this.toDoForm = this.formBuilder.group({
      toDo: '',
      label: '',
      status: '',
      dueDate: '',
    });
  }

  ngOnInit(): void {
    this.getStatusesList();
    this.getLabelsList();
  }

  getLabelsList(): void {
    this.todoService.getLabelsList().subscribe(
      (response: ILabels[]) => {
        this.labels = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getStatusesList(): void {
    this.todoService.getStatusList().subscribe(
      (response: IStatus[]) => {
        this.statuses = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(formData): void {
    this.todo.toDo = formData['toDo'];
    this.todo.toDo = formData['label'];
    this.todo.toDo = formData['status'];
    this.todo.toDo = formData['dueDate'];
    console.log(this.todo);
  }
}
