import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'burgerPartFilter'
})
export class BurgerPartFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
