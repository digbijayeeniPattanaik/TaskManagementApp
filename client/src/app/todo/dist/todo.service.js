"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TodoService = void 0;
var core_1 = require("@angular/core");
var TodoService = /** @class */ (function () {
    function TodoService(http) {
        this.http = http;
        this.baseUrl = 'https://localhost:5001/api/';
    }
    TodoService.prototype.getToDoList = function () {
        return this.http.get(this.baseUrl + 'tasks');
    };
    TodoService.prototype.getLabelsList = function () {
        return this.http.get(this.baseUrl + 'labels');
    };
    TodoService.prototype.getStatusList = function () {
        return this.http.get(this.baseUrl + 'Status');
    };
    TodoService.prototype.deleteTask = function (id) {
        return this.http["delete"](this.baseUrl + 'tasks/' + id);
    };
    TodoService.prototype.updateTask = function (id, toDo) {
        return this.http.put(this.baseUrl + 'tasks/' + id, toDo);
    };
    TodoService.prototype.getToDoItem = function (id) {
        return this.http.get(this.baseUrl + 'tasks/' + id);
    };
    TodoService.prototype.createTask = function (toDo) {
        return this.http.post(this.baseUrl + 'tasks', toDo);
    };
    TodoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], TodoService);
    return TodoService;
}());
exports.TodoService = TodoService;
