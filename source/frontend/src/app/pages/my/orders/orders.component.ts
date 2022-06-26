import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderModel } from 'src/app/models/sale/OrderModel';
import { IDataColumn } from 'src/app/modules/data-components/models/DataTableModels';
import { OrderService } from 'src/app/services/sale/OrderService';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  orders$: Observable<OrderModel[]> = this.orderService.getMyOrders();
  columns: IDataColumn[] = [
    { key: "status", title: "Status", sortable: true, filterable: true },    
    { key: "orderDate", title: "Order Date", sortable: true, filterable: true, },
    { key: "completeDate", title: "Completed", sortable: true, filterable: true },
    { key: "amount", title: "Amount", sortable: true, filterable: true }
  ];

  ngOnInit(): void {
  }

}
