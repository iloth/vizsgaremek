import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dcFilter',
  pure: false
})
export class FilterPipe<Entity extends {[key: string] : any}> implements PipeTransform {

  transform(value: Entity[] | null, filtersJSON: string): Entity[] | null {
    const filters = JSON.parse(filtersJSON);

    if (value === null || value.length === 0 || filters == null || filters == undefined || Object.getOwnPropertyNames(filters).length == 0)
      return value;

    Object.getOwnPropertyNames(filters).forEach((key) => {
      if(filters[key] === null || filters[key] === undefined || filters[key] === '') {
        return;
      }

      value = (value ?? []).filter((item) => {
        if (Array.isArray(filters[key])) {
          return (filters[key].length == 0 || filters[key].some((i: any) => i == item[key]));
        }

        switch (typeof filters[key]) {
          case 'string':
            return ('' + item[key]).toLowerCase().includes(filters[key].toLowerCase());
          case 'number':
          case 'boolean':
            return item[key] == filters[key];
          default: 
            return true;
        }        
      })
    });

    return value;
  
  }

}
