import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toHorsePower'
})

export class ToHPPipe implements PipeTransform {
    transform(value: number): string {
        if (!value) return '';

        const res = (value * 1.36).toFixed(1);
        return '(' + res + ' HP)';
    }
}
