import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "src/app/models/admin/UserModel";
import { BaseApiService } from "../BaseApiService";

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseApiService<UserModel> {
  constructor(private http: HttpClient) {
    super(http, 'admin/users')
  }

  resetPassword(id: string, password: string): Observable<null> {
    const url = `${this.url}/${id}/resetpassword`
    return this.http.post<null>(url, { password: password });
  }

  getMyProfile(): Observable<UserModel> {
    const url = `${this.apiUrl}/my/profile`
    return this.http.get<UserModel>(url);
  }

  updateMyProfile(model: UserModel): Observable<UserModel> {
    const url = `${this.apiUrl}/my/profile`
    return this.http.put<UserModel>(url, model);
  }

  resetMyPassword(password: string): Observable<null> {
    const url = `${this.apiUrl}/my/resetpassword`
    return this.http.post<null>(url, { password: password });
  }

}