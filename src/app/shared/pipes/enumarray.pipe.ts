import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object) {
    const keys = Object.keys(data);
    const items = [];
    keys.forEach(key => {
      items.push(data[key]);
    });
    return items;
  }
}
