import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpecialChar'
})
//Custom Pipe used to remove all special characters from the titles inputed by the user
export class MovieTitlePipe implements PipeTransform {
  transform(value: string): string {
    let newVal = value.replace(/[^\w\s]/gi, '')
    return newVal;
  }
}
