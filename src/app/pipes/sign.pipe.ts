import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sign'
})
export class SignPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return (value < 0 ? "" : "+") + value;
  }

}
