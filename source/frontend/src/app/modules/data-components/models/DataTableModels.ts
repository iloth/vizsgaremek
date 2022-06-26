export interface IDataColumn {
  key: string,
  title: string,
  sortable: boolean,
  filterable: boolean,
  format?: (value: any) => string,
  link?: (value: any) => { url: string, text: string, title?: string }
  display?: Displays,
}

export enum Displays {
  Email,
  Phone,
  Checkbox,
  Link
}