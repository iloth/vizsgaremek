export interface IDataColumn {
  key: string,
  title: string,
  sortable: boolean,
  filterable: boolean,
  format?: Function,
  display?: Displays,
}

export enum Displays {
  Email,
  Phone,
  Checkbox
}