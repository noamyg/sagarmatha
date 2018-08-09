import { Pipe, PipeTransform } from '@angular/core';
import { sprintf } from "sprintf-js";

@Pipe({
  name: 'sprintf',
  pure: true
})
export class SprintfPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return sprintf(value, args);
  }

}
