import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILabels, IStatus, IToDo } from 'src/app/models/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss'],
})
export class TodoCreateComponent implements OnInit {
  @Input() toDoForm: FormGroup;
  labels: ILabels[];
  statuses: IStatus[];
  todo: IToDo;
  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.toDoForm = this.formBuilder.group({
      toDo: [null, Validators.required],
      label: [null, Validators.required],
      status: [null, Validators.required],
      dueDate: [null, Validators.required]
    })
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

  onSubmit(): void {
    console.log(this.toDoForm.value);
    this.todoService.createTask(this.toDoForm.value)
    .subscribe(() =>{
      console.log("Saved successfully");
      this.router.navigate(['/task-list']);
    }, error => {
        console.log(error);
    });
  }
}
