import { OrderModel } from "./OrderModel";

export class Orders {
  count: number = 0;
  orders: OrderModel[] = []
}

export class OrderStat {
  total: number = 0;
  ordered: number = 0
  inprogress: number = 0;
  completed: number = 0;
  cancelled: number = 0;
  inDay: number = 0;
  inWeek: number = 0;
  inMonth: number = 0;
  inYear: number = 0;
}

export class OrderHistoryWeek {
  week: string = '';
  completed: number = 0
}

export class OrderHistoryMonth {
  month: string = '';
  completed: number = 0;
}