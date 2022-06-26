import { BaseModel } from "../models/BaseModel";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export abstract class BaseService<Model extends BaseModel> {
  constructor(
    private httpClient: HttpClient,
    protected readonly entityUrl: string
  ) { 
    this.url = this.apiUrl + entityUrl;
  }

  protected readonly apiUrl: string = environment.apiUrl;
  protected readonly url: string = '';

  getAll(): Observable<Model[]> {
    const url = `${this.url}`;
    return this.httpClient.get<Model[]>(url);
  }

  get(id: string): Observable<Model> {
    const url = `${this.url}/${id}`;
    return this.httpClient.get<Model>(url);
  }

  create(item: Model): Observable<Model> {
    const url = `${this.url}`;
    item._id = null;
    return this.httpClient.post<Model>(url, item);
  }

  update(item: Model): Observable<Model> {
    const url = `${this.url}/${item._id}`;
    return this.httpClient.put<Model>(url, item);
  }

  delete(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.httpClient.delete(url);
  }

}
