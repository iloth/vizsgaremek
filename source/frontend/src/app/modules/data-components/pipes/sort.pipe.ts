import { Pipe, PipeTransform } from '@angular/core';
import { IDataColumn } from '../models/DataTableModels';

@Pipe({
  name: 'dcSort',
  pure: false
})
export class SortPipe<Entity extends {[key: string] : any}> implements PipeTransform {

  transform(value: Entity[] | null, columns: IDataColumn[], sortKey: string | null, sortDirection: number = 1): Entity[] | null {
    if (sortKey && value) {
      const column = columns.find((col) => col.key === sortKey);
      const format = column?.format;

      value.sort( (a: Entity, b: Entity) => {
        if (typeof a[sortKey] === 'number' && typeof b[sortKey] === 'number') {
          return (a[sortKey] - b[sortKey]) * sortDirection;
        } else {
          return (
            ('' + format === null ? a[sortKey] : (format ?? ((x: any)=> x))(a[sortKey]))
              .toLowerCase()
              .localeCompare(
                ('' + format === null ? b[sortKey] : (format ?? ((x: any)=> x))(b[sortKey])).toLowerCase()
              )
            ) * sortDirection;
        }
      });
    }

    return value;

  }

}
