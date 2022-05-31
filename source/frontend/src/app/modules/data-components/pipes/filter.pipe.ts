import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe<Entity extends {[key: string] : any}> implements PipeTransform {

  transform(value: Entity[] | null, filters: string): Entity[] | null {
    if (value === null)
      return null;
    
    const filterObj = JSON.parse(filters);
    Object.getOwnPropertyNames(filterObj).forEach((key) => {
      value = (value ?? []).filter((item) => ('' + item[key]).toLowerCase().includes(filterObj[key].toLowerCase()))        
    });

    return value;
  
  }

}
