import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/admin/UserModel';
import { IAddress } from 'src/app/models/interfaces/AddressModel';
import { IDataColumn } from 'src/app/modules/data-components/models/DataTableModels';
import { UserService } from 'src/app/services/admin/UserService';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  users$: Observable<UserModel[]> = this.userService.getAll();

  columns: IDataColumn[] = [
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "address", title: "Address", format: (address: IAddress) => `${address.zip} ${address.city}, ${address.address}` },    
    { key: "roles", title: "Roles", format: (roles: string[]) => roles.join(' | ') },
    { key: "active", title: "Is active" },
  ];

  ngOnInit(): void {
  }

  onEdit(item: UserModel) {
    this.router.navigate(['/', 'admin', 'user', item._id]);
  }
}
