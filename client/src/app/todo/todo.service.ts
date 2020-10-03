import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILabels, IStatus, IToDo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  getToDoList() {
    return this.http.get<IToDo[]>(this.baseUrl + 'tasks');
  }

  getLabelsList() {
    return this.http.get<ILabels[]>(this.baseUrl + 'tasks/labels');
  }

  getStatusList() {
    return this.http.get<IStatus[]>(this.baseUrl + 'tasks/statuses');
  }
}
