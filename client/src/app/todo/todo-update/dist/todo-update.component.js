"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TodoUpdateComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var TodoUpdateComponent = /** @class */ (function () {
    function TodoUpdateComponent(formBuilder, activatedroute, todoService, router) {
        this.formBuilder = formBuilder;
        this.activatedroute = activatedroute;
        this.todoService = todoService;
        this.router = router;
    }
    TodoUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedroute.paramMap.subscribe(function (params) {
            _this.id = Number(params.get('id'));
        });
        this.toDoForm = this.formBuilder.group({
            toDo: [null, forms_1.Validators.required],
            label: [null, forms_1.Validators.required],
            status: [null, forms_1.Validators.required],
            dueDate: [null, forms_1.Validators.required]
        });
        this.getToDoItem(this.id);
        this.getLabelsList();
        this.getStatusesList();
    };
    TodoUpdateComponent.prototype.getToDoItem = function (id) {
        var _this = this;
        this.todoService.getToDoItem(id).subscribe(function (response) {
            if (response) {
                _this.toDoUpdate = response;
                console.log(_this.toDoUpdate);
                _this.toDoForm.patchValue(response);
            }
        }, function (error) {
            console.error(error);
        });
    };
    TodoUpdateComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.toDoForm.value);
        this.todoService.updateTask(this.id, this.toDoForm.value)
            .subscribe(function () {
            console.log("Saved successfully");
            _this.router.navigate(['/task-list']);
        }, function (error) {
            console.log(error);
        });
    };
    TodoUpdateComponent.prototype.getLabelsList = function () {
        var _this = this;
        this.todoService.getLabelsList().subscribe(function (response) {
            _this.labels = response;
        }, function (error) {
            console.error(error);
        });
    };
    TodoUpdateComponent.prototype.getStatusesList = function () {
        var _this = this;
        this.todoService.getStatusList().subscribe(function (response) {
            _this.statuses = response;
        }, function (error) {
            console.error(error);
        });
    };
    TodoUpdateComponent = __decorate([
        core_1.Component({
            selector: 'app-todo-update',
            templateUrl: './todo-update.component.html',
            styleUrls: ['./todo-update.component.scss']
        })
    ], TodoUpdateComponent);
    return TodoUpdateComponent;
}());
exports.TodoUpdateComponent = TodoUpdateComponent;
