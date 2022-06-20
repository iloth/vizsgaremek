import { BaseModel } from '../BaseModel';

export class OrderItemModel extends BaseModel {
  constructor(
    _id: string | null = null,
    public orderId: string = '',
    public favouriteId: string = '',
    public burgerParts: string[] = [],
    public amount: number = 0,
    public notes: string,
  ) {
    super(_id);
  }
}