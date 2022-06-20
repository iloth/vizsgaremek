import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderModel } from 'src/app/models/sale/OrderModel';
import { BaseService } from '../BaseService';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<OrderModel> {
  constructor(
    private http: HttpClient
  ) {
    super(http, 'orders');
  }
}
