import { Pipe } from "@angular/core";

@Pipe({
  name: "sort",
  pure: true
})

export class ArraySortPipe {
  transform(array: Array<string>, property: string, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if (a[property] < b[property]) {
        return -1;
      } else if (a[property] > b[property]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}