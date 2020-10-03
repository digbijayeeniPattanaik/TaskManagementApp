import { Component, OnInit } from '@angular/core';
import { ILabels, IStatus, IToDo } from 'src/app/models/todo';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.scss'],
})
export class TodoUpdateComponent implements OnInit {
  toDoUpdate: IToDo;
  toDoForm: FormGroup; 
  labels: ILabels[];
  statuses: IStatus[];
  id: number;
  constructor(private formBuilder: FormBuilder,private activatedroute:ActivatedRoute, private todoService: TodoService) {}

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
        this.id = Number(params.get('id'));
    });
    this.getToDoItem(this.id);
  }

  getToDoItem(id: number): void {
    this.todoService.getToDoItem(id).subscribe
        (response => {
          this.toDoUpdate = response;
          console.log(this.toDoUpdate);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  onSubmit(formData): void {
    console.log(formData);
    this.toDoUpdate.toDo = formData['toDo'];
    this.toDoUpdate.dueDate = formData['dueDate'];
    this.toDoUpdate.status = formData['status'];
    this.toDoUpdate.label = formData['label'];
    console.log(this.toDoUpdate);
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

}
