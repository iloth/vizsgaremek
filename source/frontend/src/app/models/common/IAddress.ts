export interface IAddress {
  zip: string;
  city: string,
  address: string
}

export class Address implements IAddress {
  zip: string = "";
  city: string = "";
  address: string = "";
}