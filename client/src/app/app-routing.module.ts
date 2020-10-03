import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoCreateComponent } from './todo/todo-create/todo-create.component';
import { TodoComponent } from './todo/todo/todo.component';

const routes: Routes = [
  { 
    path: 'task-list', 
    component: TodoComponent
  },
  {
    path: 'task-create',
    component: TodoCreateComponent
  },
  { path: '',  
   redirectTo: '/task-list',
    pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
