import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderItemService } from 'src/app/services/sale/OrderItemService';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  constructor(
    private orderItemService: OrderItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  item$ = this.activatedRoute.params.pipe(
    switchMap((params) => {
      return this.orderItemService.get(params['id']);
    })
  );

  ngOnInit(): void {
  }

}
