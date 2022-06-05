import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BurgerPartModel } from "src/app/models/common/BurgerPartModel";
import { BaseService } from "../BaseService";

@Injectable({
  providedIn: 'root',
})
export class BurgerPartService extends BaseService<BurgerPartModel> {
  constructor(private http: HttpClient) {
    super(http, 'admin/parts')
  }
}