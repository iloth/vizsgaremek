import { BaseModel } from '../BaseModel';
import { BurgerPartModel } from '../common/BurgerPartModel';

export class OrderItemModel extends BaseModel {
  constructor(
    _id: string | null = null,
    public orderId: string = '',
    public favouriteId: string = '',
    public burgerParts: BurgerPartModel[] = [],
    public amount: number = 0,
    public notes: string,
  ) {
    super(_id);
  }
}