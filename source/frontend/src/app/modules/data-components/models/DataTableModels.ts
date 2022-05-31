export interface IDataColumn {
  key: string,
  title: string,
  sortable: boolean,
  format?: Function,
  display?: Displays,
}

export enum Displays {
  Email,
  Phone,
  Checkbox
}