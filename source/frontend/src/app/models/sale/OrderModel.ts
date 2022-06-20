import { BaseModel } from '../BaseModel';

export class OrderModel extends BaseModel {
  constructor(
    _id: string | null = null,
    public userId: string,
    public orderDate: Date,
    public status: string,
    public amount: number,
    public completeDate: Date,    
  ) {
    super(_id);
  }
}