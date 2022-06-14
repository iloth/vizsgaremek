import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/admin/UserModel';
import { ILogin, ILoginResult } from 'src/app/models/common/auth';
import { AuthService } from 'src/app/services/auth/AuthService';
import { BaseFormPage } from '../BaseFormPage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormPage implements OnInit {
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) { 
    super();
  }

  mainForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.minLength(8)])
  });
  serverError?: string;

  ngOnInit(): void {
  }

  onSubmit() {
    const login: ILogin = { ...this.mainForm.value } as ILogin;
    this.authService.login(login).then(
      (response: UserModel) => {
        this.router.navigate(['/']);
      },
      (err: Error) => {
        this.serverError = err.message;
      }
    )
  }

}
