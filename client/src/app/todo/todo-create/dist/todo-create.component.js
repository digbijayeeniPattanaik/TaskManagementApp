"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TodoCreateComponent = void 0;
var core_1 = require("@angular/core");
var TodoCreateComponent = /** @class */ (function () {
    function TodoCreateComponent(formBuilder, todoService) {
        this.formBuilder = formBuilder;
        this.todoService = todoService;
        this.toDoForm = this.formBuilder.group({
            toDo: '',
            label: '',
            status: '',
            dueDate: ''
        });
    }
    TodoCreateComponent.prototype.ngOnInit = function () {
        this.getStatusesList();
        this.getLabelsList();
    };
    TodoCreateComponent.prototype.getLabelsList = function () {
        var _this = this;
        this.todoService.getLabelsList().subscribe(function (response) {
            _this.labels = response;
        }, function (error) {
            console.error(error);
        });
    };
    TodoCreateComponent.prototype.getStatusesList = function () {
        var _this = this;
        this.todoService.getStatusList().subscribe(function (response) {
            _this.statuses = response;
        }, function (error) {
            console.error(error);
        });
    };
    TodoCreateComponent.prototype.onSubmit = function (formData) {
        this.todo.toDo = formData['toDo'];
        this.todo.toDo = formData['label'];
        this.todo.toDo = formData['status'];
        this.todo.toDo = formData['dueDate'];
        console.log(this.todo);
    };
    TodoCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-todo-create',
            templateUrl: './todo-create.component.html',
            styleUrls: ['./todo-create.component.scss']
        })
    ], TodoCreateComponent);
    return TodoCreateComponent;
}());
exports.TodoCreateComponent = TodoCreateComponent;
