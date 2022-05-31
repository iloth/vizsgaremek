import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'page',
  pure: false
})
export class PagePipe<Entity extends {[key: string] : any}> implements PipeTransform {

  transform(value: Entity[] | null, pageable: boolean, currPage: number = 1, pageSize: number = environment.dataComponents.pager.defaultPageSize): Entity[] | null {
    if (pageable && value) {
      return (value ?? []).slice((currPage - 1) * pageSize, (currPage - 1) * pageSize + pageSize - 1)
    }
    return value;
  }

}
