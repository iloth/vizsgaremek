import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/admin/UserModel';
import { IAddress } from 'src/app/models/common/IAddress';
import { Displays, IDataColumn } from 'src/app/modules/data-components/models/DataTableModels';
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
    { key: "name", title: "Name", sortable: true, filterable: true },
    { key: "email", title: "Email", sortable: true, filterable: true, display: Displays.Email },
    { key: "address", title: "Address", sortable: true, filterable: true, format: (address: IAddress) => `${address.zip} ${address.city}, ${address.address}` },    
    { key: "roles", title: "Roles", sortable: false, filterable: true, format: (roles: string[]) => roles.join(' | ') },
    { key: "active", title: "Is active", sortable: true, filterable: true, display: Displays.Checkbox },
  ];

  ngOnInit(): void {
  }

  onEditClick(item: UserModel) {
    this.router.navigate(['/', 'admin', 'user', item._id]);
  }

  onCreateClick() {
    this.router.navigate(['/', 'admin', 'user', 'new']);
  }
}
