import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/sale/OrderService';
import { OrderItemService } from 'src/app/services/sale/OrderItemService';
import { switchMap } from 'rxjs';
import { IDataColumn } from 'src/app/modules/data-components/models/DataTableModels';
import { BurgerPartModel } from 'src/app/models/common/BurgerPartModel';
import { OrderItemModel } from 'src/app/models/sale/OrderItemModel';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router, 
  ) { }

  item$ = this.activatedRoute.params.pipe(
    switchMap((params) => {
      return this.orderService.get(params['id']);
    })
  );

  lines$ = this.activatedRoute.params.pipe(
    switchMap((params) => {
      return this.orderItemService.getByOrderId(params['id']);
    })
  );

  lineColumns: IDataColumn[] = [
    { key: 'amount', title: 'Amount', filterable: false, sortable: false },
    { key: 'favouriteId', title: 'Favourite', filterable: false, sortable: false },
    { key: 'notes', title: 'Notes', filterable: false, sortable: false },
    { key: 'burgerParts', title: 'Parts', filterable: false, sortable: false, format: (value: BurgerPartModel[]) => { return `count: ${value.length}` } },
  ]

  onLineEditClick(item: OrderItemModel) {
    this.router.navigate(['/', 'sale', 'orderitem', item._id])
  }

  ngOnInit(): void {
  }

}
