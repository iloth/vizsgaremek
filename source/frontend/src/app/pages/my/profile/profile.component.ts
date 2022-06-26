import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ResetPasswordModel } from 'src/app/models/admin/ResetPasswordModel';
import { UserModel } from 'src/app/models/admin/UserModel';
import { UserService } from 'src/app/services/admin/UserService';
import { CustomValidators } from 'src/app/utils/CustomValidators';
import { BaseFormPage } from '../../BaseFormPage';

@Component({
  selector: 'app-my-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class MyProfileComponent extends BaseFormPage implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    super();
  }

  mainForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormGroup({
      zip: new FormControl('', [Validators.required, Validators.minLength(3)]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    }),
    active: new FormControl(true),
    roles: new FormControl([] as string[], [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl(''),
  });

  resetPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl(''),
  }, { 
    validators: [CustomValidators.mustMatch('password', 'password2')]    
  });
  
  ngOnInit(): void {
    this.userService.getMyProfile().subscribe({
      next: (userModel: UserModel) => {
        this.mainForm.patchValue(userModel);
      },
      error: (error: HttpErrorResponse) => {
        this.router.navigate(['/', 'error'], { skipLocationChange: true, queryParams: { error: JSON.stringify(error) } });            
      }
    });
  }

  onSubmit() {
    const user: UserModel = { ...this.mainForm.value } as UserModel;

    this.userService.updateMyProfile(user).subscribe({
      next: (result: UserModel) => {
        const toast = bootstrap.Toast.getInstance('userSavedToast');
        toast?.show();
      },
      error: (err: Error) => {
        this.showError(err);
      }
    });
  }

  onResetPasswordSubmit() {
    const pwd: ResetPasswordModel = { ...this.resetPasswordForm.value } as ResetPasswordModel;
        
    this.userService.resetMyPassword(pwd.password).subscribe({
      next: () => {
        const modal = new bootstrap.Modal(document.getElementById('resetPasswordModal') as Element);
        modal?.hide(); //FIXME: modal.hide()
        const toast = new bootstrap.Toast(document.getElementById('resetPasswordToast') as Element);
        toast?.show();
      },
      error: (err: Error) => {
        this.showError(err);
      }
    });
  }
}
