import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loading = false;
  errorMsg = '';
  succMsg;
  dismiss = false;

  form: FormGroup;
  constructor(private userService: UserServiceService,
    private fb: FormBuilder, private router: Router,
    ) {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(3)])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
    });
    }

  ngOnInit() {}

  get f() {
    return this.form.controls;
  }
  isBtnDisabled() {
    return this.form.invalid || this.loading;
  }
  addUser() {
    this.loading = true;

    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    const username = this.f.username.value;
    const email = this.f.email.value;
    const password = this.f.password.value;
    this.userService.createAccount(username, email, password)
      .subscribe(
        successRes => {
          this.succMsg = successRes['message'];
          this.form.reset();
          this.router.navigate(['/accounts/login']);
        },
        error => {
          this.loading = false;
          this.errorMsg = error.statusText;
        },
        () => {
          this.loading = false;
        }

      );
  }


  dismissMsg() {
    setTimeout(function (succMsg) {
      this.dismiss = false;
    }, 3000);
  }

}
