import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderByDate'
})

export class OrderByDatePipe implements PipeTransform {
    transform(array: any[], sort = 'DESC'): any {
        if (!array || array.length === 0) return [];

        return array.sort((item1, item2): number => {
            if (item1.date > item2.date) return sort === 'DESC' ? -1 : 1;
            if (item1.date < item2.date) return sort === 'DESC' ? 1 : -1;
            return 0;
        });

    }
}
