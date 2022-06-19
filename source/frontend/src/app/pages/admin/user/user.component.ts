import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { UserModel } from 'src/app/models/admin/UserModel';
import { EditModes } from 'src/app/utils/EditModes';
import { UserService } from 'src/app/services/admin/UserService';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseFormPage } from '../../BaseFormPage';
import { CustomValidators } from 'src/app/utils/CustomValidators';
import { ResetPasswordModel } from 'src/app/models/admin/ResetPasswordModel';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseFormPage implements OnInit {
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { super(); }

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
  }, { 
    validators: [CustomValidators.mustMatch('password', 'password2')]
  });

  resetPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl(''),
  }, { 
    validators: [CustomValidators.mustMatch('password', 'password2')]    
  });

  roles = {
    admin: false,
    empl: false,
    user: false,
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (!params['id'] || params['id'] === "" || params['id'] == "new") {
        this.mainForm.patchValue(new UserModel());
        this.editMode = EditModes.Create;
        this.roles.user = true;
      } else {
        this.userService.get(params['id']).subscribe(
          (userModel: UserModel) => {
            if (!userModel) {
              this.router.navigate(['/', '404'], {skipLocationChange: true});
            }
            
            this.editMode = EditModes.Edit;

            this.mainForm.patchValue(userModel);

            this.roles.admin = userModel.roles.find((r) => r == "admin") != undefined;
            this.roles.empl = userModel.roles.find((r) => r == "empl") != undefined;
            this.roles.user = userModel.roles.find((r) => r == "user") != undefined;
          },
          (error: HttpErrorResponse) => {
            this.router.navigate(['/', 'error'], { skipLocationChange: true, queryParams: { error: JSON.stringify(error) } });            
          });
      }
    });

    this.resetPasswordForm.markAllAsTouched();
  }

  onRoleChange() {
    const roles = [];
    if (this.roles.admin) roles.push("admin");
    if (this.roles.empl) roles.push("empl");
    if (this.roles.user) roles.push("user");
    
    this.mainForm.patchValue({
      roles: [...roles]
    });
  }

  onSubmit() {
    const user: UserModel = { ...this.mainForm.value } as UserModel;

    if (this.editMode == EditModes.Create) {
      this.userService.create(user).subscribe({
        next: (result: UserModel) => {
          this.router.navigate(['/', 'admin', 'user', result._id]);
        },
        error: this.showError
      });
    } else {
      this.userService.update(user).subscribe({
        next: (result: UserModel) => {
          const toast = new bootstrap.Toast(document.getElementById('userSavedToast') as Element);
          toast.show();
        },
        error: this.showError
      });
    }
  }

  onDelete() {
    const user: UserModel = { ...this.mainForm.value } as UserModel;

    this.userService.delete(user._id ?? '').subscribe({
      next: () => {
        this.router.navigate(['/', 'admin', 'users'])
      },
      error: this.showError
    });
  }

  onResetPasswordSubmit() {
    const pwd: ResetPasswordModel = { ...this.resetPasswordForm.value } as ResetPasswordModel;
        
    this.userService.resetPassword(this.mainForm.get('_id')?.value, pwd.password).subscribe({
      next: () => {
        const toast = new bootstrap.Toast(document.getElementById('resetPasswordToast') as Element);
        toast.show();
        const modal = new bootstrap.Modal(document.getElementById('resetPasswordModal') as Element);
        modal.toggle();
      },
      error: this.showError
    });
  }
}
