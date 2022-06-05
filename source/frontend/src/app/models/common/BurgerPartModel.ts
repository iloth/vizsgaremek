import { BaseModel } from '../BaseModel';

export class BurgerPartModel extends BaseModel {
  constructor(
    _id: string | null = null,
    public name: string = '',
    public description: string = '',
    public price: number = 0,
    public category: 'bun' | 'meat' | 'cheese' | 'vegetable' | 'sauce' | 'extra' | 'other' = 'other',
    public image: string = '',
    public freeFrom: string[] = [], //gluten, lactose, sugar
    public vegan: 'no' | 'vegetarian' | 'vegan' = 'no',
    public hot: number = 0,
    public status: 'ok' | 'tna' | 'na' = 'ok',
    public defaultPlace: number = 50,
  ) { 
    super(_id);
  }
}

export enum BurgerPartCategories {
  bun = 'Bun',
  meat = 'Meat',
  cheese = 'Cheese',
  vegetable = 'Vegetable',
  sauce = 'Sauce',
  extra = 'Extra',
  other = 'Other'
};

export enum BurgerPartStatuses {
  ok = 'Available',
  tna = 'Temporary Not Available',
  na = 'Not Available',
};

export enum BurgerPartVegetarian {
  no = 'No',
  vegetarian = 'Vegetarian',
  vegan = 'Vegan',
};


