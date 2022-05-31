export interface IDataColumn {
  key: string,
  title: string,
  format?: Function,
  display?: Displays
}

export enum Displays {
  Email,
  Phone,
  Checkbox
}