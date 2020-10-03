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
var forms_1 = require("@angular/forms");
var TodoCreateComponent = /** @class */ (function () {
    function TodoCreateComponent(formBuilder, todoService, router) {
        this.formBuilder = formBuilder;
        this.todoService = todoService;
        this.router = router;
    }
    TodoCreateComponent.prototype.ngOnInit = function () {
        this.toDoForm = this.formBuilder.group({
            toDo: [null, forms_1.Validators.required],
            label: [null, forms_1.Validators.required],
            status: [null, forms_1.Validators.required],
            dueDate: [null, forms_1.Validators.required]
        });
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
    TodoCreateComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.toDoForm.value);
        this.todoService.createTask(this.toDoForm.value)
            .subscribe(function () {
            console.log("Saved successfully");
            _this.router.navigate(['/task-list']);
        }, function (error) {
            console.log(error);
        });
    };
    __decorate([
        core_1.Input()
    ], TodoCreateComponent.prototype, "toDoForm");
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
