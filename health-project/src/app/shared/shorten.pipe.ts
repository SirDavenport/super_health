import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string): any {

    return "..."+value.substr(value.length-5, value.length);
  }

}
