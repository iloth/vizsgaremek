import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderItemModel } from 'src/app/models/sale/OrderItemModel';
import { BaseService } from '../BaseService';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService extends BaseService<OrderItemModel> {
  constructor(
    private http: HttpClient
  ) {
    super(http, 'orderitems');
  }
}
