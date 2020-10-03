"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TodoComponent = void 0;
var core_1 = require("@angular/core");
var TodoComponent = /** @class */ (function () {
    function TodoComponent(todoService, router) {
        this.todoService = todoService;
        this.router = router;
    }
    TodoComponent.prototype.ngOnInit = function () {
        this.getToDoList();
    };
    TodoComponent.prototype.getToDoList = function () {
        var _this = this;
        this.todoService.getToDoList()
            .subscribe(function (response) {
            _this.toDoList = response;
        }, function (error) {
            console.error(error);
        });
    };
    TodoComponent.prototype.deleteTask = function (id) {
        var _this = this;
        this.todoService.deleteTask(id)
            .subscribe(function (response) {
            console.log(response);
            console.log("loading again");
            _this.getToDoList();
        }, function (error) {
            console.error(error);
            _this.getToDoList();
        });
    };
    TodoComponent = __decorate([
        core_1.Component({
            selector: 'app-todo',
            templateUrl: './todo.component.html',
            styleUrls: ['./todo.component.scss']
        })
    ], TodoComponent);
    return TodoComponent;
}());
exports.TodoComponent = TodoComponent;
