import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpecialChar'
})

export class MovieTitlePipe implements PipeTransform {
  transform(value: string): string {
    let newVal = value.replace(/[^\w\s]/gi, '')
    return newVal;
  }
}
