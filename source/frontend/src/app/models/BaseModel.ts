export abstract class BaseModel {
  constructor(
    public _id: string | null = null
  ) {}
  [key: string]: any;
}