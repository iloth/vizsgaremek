import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from 'src/app/models/sale/OrderModel';
import { BaseApiService } from '../BaseApiService';
@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseApiService<OrderModel> {
  constructor(
    private http: HttpClient
  ) {
    super(http, 'orders');
  }

  getMyOrders(): Observable<OrderModel[]> {
    const url = `${this.apiUrl}/my/orders`
    return this.http.get<OrderModel[]>(url);
  }

}
