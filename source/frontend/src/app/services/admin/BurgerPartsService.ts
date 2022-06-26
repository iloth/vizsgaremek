import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BurgerPartModel } from "src/app/models/common/BurgerPartModel";
import { BaseApiService } from "../BaseApiService";

@Injectable({
  providedIn: 'root',
})
export class BurgerPartService extends BaseApiService<BurgerPartModel> {
  constructor(private http: HttpClient) {
    super(http, 'admin/parts')
  }
}