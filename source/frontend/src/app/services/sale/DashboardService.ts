import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistoryMonth, OrderHistoryWeek, Orders, OrderStat } from 'src/app/models/sale/Dashboard';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private http: HttpClient
  ) { }

  private apiUrl: string = environment.apiUrl
  private url: string = `${this.apiUrl}dashboard`
  
  getNewOrders(): Observable<Orders | null> {
    const url = `${this.url}/orders/new`;
    return this.http.get<Orders>(url);
  }

  getInprogressOrders(): Observable<Orders | null> {
    const url = `${this.url}/orders/inprogress`;
    return this.http.get<Orders>(url);
  }

  getOrderStat(): Observable<OrderStat | null> {
    const url = `${this.url}/orders/stat`;
    return this.http.get<OrderStat>(url);
  }

  getOrderHistoryW(): Observable<OrderHistoryWeek[] | null> {
    const url = `${this.url}/orders/historyw`;
    return this.http.get<OrderHistoryWeek[]>(url);
  }

  getOrderHistoryM(): Observable<OrderHistoryMonth[] | null> {
    const url = `${this.url}/orders/historym`;
    return this.http.get<OrderHistoryMonth[]>(url);
  }

}
