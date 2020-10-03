import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { TodoCreateComponent } from './todo/todo-create/todo-create.component';
import { TodoUpdateComponent } from './todo/todo-update/todo-update.component';
import { TodoComponent } from './todo/todo/todo.component';

const routes: Routes = [
  {
    path: 'task-list',
    component: TodoComponent,
  },
  {
    path: 'task-create',
    component: TodoCreateComponent,
  },
  {
    path: 'task-update/:id',
    component: TodoUpdateComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: '', redirectTo: '/task-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
