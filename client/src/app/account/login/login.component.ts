import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/account';
import { TodoService } from 'src/app/todo/todo.service';
import { AppcookieService } from 'src/app/services/appcookie.service';
// import { JWTTokenService } from 'src/app/services/jwttoken.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() loginForm: FormGroup;
  user: IUser;
  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private router: Router,
    private appCookieService: AppcookieService
    // private jwtTokenService  : JWTTokenService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    this.todoService.login(this.loginForm.value).subscribe(
      (response: IUser) => {
        console.log(response);
        this.user = response;
        this.appCookieService.set('token', 'Bearer ' + this.user.token);
        this.router.navigate(['/task-list']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
