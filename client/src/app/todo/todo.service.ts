import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILabels, IStatus, IToDo } from '../models/todo';
import { IRegister, ILogin, IUser } from '../models/account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) {}

  getToDoList(): Observable<IToDo[]> {
    return this.http.get<IToDo[]>(this.baseUrl + 'tasks');
  }

  getLabelsList(): Observable<ILabels[]> {
    return this.http.get<ILabels[]>(this.baseUrl + 'labels');
  }

  getStatusList(): Observable<IStatus[]> {
    return this.http.get<IStatus[]>(this.baseUrl + 'Status');
  }

  deleteTask(id: number) {
    console.log(this.baseUrl + 'tasks/' + id);
    return this.http.delete(this.baseUrl + 'tasks/' + id);
  }

  updateTask(id: number, toDo: IToDo) {
    return this.http.put(this.baseUrl + 'tasks/' + id, toDo);
  }

  getToDoItem(id: number): Observable<IToDo> {
    return this.http.get<IToDo>(this.baseUrl + 'tasks/' + id);
  }

  createTask(toDo: IToDo) {
    return this.http.post(this.baseUrl + 'tasks', toDo);
  }

  register(register: IRegister) {
    return this.http.post(this.baseUrl + 'users/register', register);
  }

  login(login: ILogin) {
    return this.http.post(this.baseUrl + 'users/login', login);
  }
}
