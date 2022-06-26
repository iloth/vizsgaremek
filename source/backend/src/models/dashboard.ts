import { IOrder } from "./orderModel";

export interface IOrders {
  count: number,
  orders: IOrder[]
}

export interface IOrderStat {
  total: number,
  ordered: number,
  inprogress: number,
  completed: number,
  cancelled: number,
  inDay: number,
  inWeek: number,
  inMonth: number,
  inYear: number
}

export interface IOrderHistoryWeek {
  week: string,
  completed: number
}

export interface IOrderHistoryMonth {
  month: string,
  completed: number
}