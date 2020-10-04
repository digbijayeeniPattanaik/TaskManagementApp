import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/account';
import { TodoService } from 'src/app/todo/todo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Input() registerForm: FormGroup;
  user: IUser;
  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      displayName: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmpassword: [null],
      address1: [null, Validators.required],
      address2: [null],
      address3: [null],
      postCode: [null, Validators.required],
      country: [null, Validators.required],
    }, {validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmpassword').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit(): void {
    console.log(this.registerForm.value);
    this.todoService.register(this.registerForm.value).subscribe(
      (response: IUser) => {
        console.log(response);
        this.user = response;
        this.router.navigate(['/task-list']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
