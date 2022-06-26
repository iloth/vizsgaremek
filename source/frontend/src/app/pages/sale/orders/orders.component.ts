import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/admin/UserModel';
import { OrderModel } from 'src/app/models/sale/OrderModel';
import { Displays, IDataColumn } from 'src/app/modules/data-components/models/DataTableModels';
import { OrderService } from 'src/app/services/sale/OrderService';
import { BasePage } from '../../BasePage';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent  extends BasePage implements OnInit {

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { super() }

  orders$: Observable<OrderModel[]> = this.orderService.getAll();
  columns: IDataColumn[] = [
    { key: "userId", title: "User", sortable: true, filterable: true, display: Displays.Link, link: (user: UserModel) => { return {url: this.router.createUrlTree(['/', 'admin', 'user', user._id]).toString(), text:  user.name } }},
    { key: "status", title: "Status", sortable: true, filterable: true },    
    { key: "orderDate", title: "Order Date", sortable: true, filterable: true, format: (value: Date) => new Date(value).toLocaleString() },
    { key: "completeDate", title: "Completed", sortable: true, filterable: true, format: (value: Date) => new Date(value).toLocaleString() },
    { key: "amount", title: "Amount", sortable: true, filterable: true }
  ];
  
  ngOnInit(): void {
  }

  onEditClick(item: OrderModel) {
    this.router.navigate(['/', 'sale', 'order', item._id])
  }
}
