import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'top',
    pure: true
})

@Injectable()
export class ArrayTopPipe implements PipeTransform {
    transform(items: any[], length: number, fromEnd: boolean): any[] {
        let start = fromEnd ? items.length - length : 0;
        let end = fromEnd ? items.length : length;
        return items.slice(start, end);
    }
}