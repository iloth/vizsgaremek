import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Observable, switchMap } from 'rxjs';
import { UserModel } from 'src/app/models/admin/UserModel';
import { UserService } from 'src/app/services/admin/UserService';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) { }

  userForm = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    address: new FormGroup({
      zip: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
    }),
    active: new FormControl(''),
    roles: new FormControl([]),
  })  

  roles = {
    admin: false,
    empl: false,
    user: false,
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap((params) => this.userService.get(params['id']))
    ).subscribe((userModel) => {
      this.userForm.patchValue(userModel);

      this.roles.admin = userModel.roles.find((r) => r == "admin") != undefined;
      this.roles.empl = userModel.roles.find((r) => r == "empl") != undefined;
      this.roles.user = userModel.roles.find((r) => r == "user") != undefined;
    });

  }

  onRoleChange() {
    const roles = [];
    if (this.roles.admin) roles.push("admin");
    if (this.roles.empl) roles.push("empl");
    if (this.roles.user) roles.push("user");
    
    this.userForm.patchValue({
      roles: [...roles]
    });
  }

  onSubmit() {
    const user: UserModel = { ...this.userForm.value } as UserModel;

    this.userService.update(user).subscribe((result) => {
      var userSavedToast = document.getElementById('userSavedToast')
      var toast = new bootstrap.Toast(userSavedToast as Element);
      toast.show()
    });
  }
}
