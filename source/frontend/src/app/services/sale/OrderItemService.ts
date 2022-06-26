import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItemModel } from 'src/app/models/sale/OrderItemModel';
import { BaseApiService } from '../BaseApiService';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService extends BaseApiService<OrderItemModel> {
  constructor(
    private http: HttpClient
  ) {
    super(http, 'orderitems');
  }

  getByOrderId(orderId: string): Observable<OrderItemModel[] | null> {
    const url = `${this.url}/order/${orderId}`;
    return this.http.get<OrderItemModel[]>(url);
  }
}
