import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRoute: ActivatedRoute
  ) { }

  user$: Observable<UserModel> = this.activatedRoute.params.pipe(
    switchMap((params) => this.userService.get(params['id']))
  )

  ngOnInit(): void {
  }

}
