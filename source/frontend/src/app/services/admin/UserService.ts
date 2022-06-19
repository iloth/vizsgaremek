import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "src/app/models/admin/UserModel";
import { BaseService } from "../BaseService";

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<UserModel> {
  constructor(private http: HttpClient) {
    super(http, 'admin/users')
  }

  resetPassword(id: string, password: string): Observable<null> {
    const url = `${this.url}/${id}/resetpassword`
    return this.http.post<null>(url, { password: password });
  }
}