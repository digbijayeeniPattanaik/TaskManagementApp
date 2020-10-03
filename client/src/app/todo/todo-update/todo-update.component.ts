import { Component, OnInit } from '@angular/core';
import { ILabels, IStatus, IToDo } from 'src/app/models/todo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private formBuilder: FormBuilder,private activatedroute:ActivatedRoute, private todoService: TodoService,  private router: Router ) {}

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
        this.id = Number(params.get('id'));
    });
    
    this.toDoForm = this.formBuilder.group({
      toDo: [null, Validators.required],
      label: [null, Validators.required],
      status: [null, Validators.required],
      dueDate: [null, Validators.required]
    });
    
    this.getToDoItem(this.id);
    this.getLabelsList();
    this.getStatusesList();
  }

  getToDoItem(id: number): void {
    this.todoService.getToDoItem(id).subscribe(response => {
      if(response)
      {
        this.toDoUpdate = response;
        console.log(this.toDoUpdate);
        this.toDoForm.patchValue(response);
      }},
        (error) => {
          console.error(error);
        }
      );
  }

  onSubmit(): void {
    console.log(this.toDoForm.value);
    this.todoService.updateTask(this.id , this.toDoForm.value)
    .subscribe(() =>{
      console.log("Saved successfully");
      this.router.navigate(['/task-list']);
    }, error => {
        console.log(error);
    });
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
