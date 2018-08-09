import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: true
})

@Injectable()
export class ArrayFilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: any): any[] {
        if (!items) {
            return [];
        }
        if (!field || !value) {
            return items;
        }
        if (value instanceof Array){
            var multipleItems = new Array();
            value.forEach(val => {
                multipleItems = multipleItems.concat(
                    items.slice().filter(
                        singleItem => singleItem[field].toString().toLowerCase().includes(val.toString().toLowerCase())
                    )
                );
            })
            return multipleItems;
        }
        return items.filter(singleItem => 
            singleItem[field].toString().toLowerCase().includes(value.toString().toLowerCase()));
    }
}