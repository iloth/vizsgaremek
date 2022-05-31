import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "src/app/models/admin/UserModel";
import { BaseService } from "../BaseService";

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<UserModel> {
  constructor(private http: HttpClient) {
    super(http, 'admin/users')
  }
}