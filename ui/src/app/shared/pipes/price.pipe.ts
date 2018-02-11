import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'price'
})

export class PricePipe implements PipeTransform {
    transform(value: number): string {

        if (!value) return '0 Kč';

        const price = value.toString().split('.');

        let pomString = '';
        const s = price[0].split('').reverse();

        for (let i = 0; i < s.length; i++) {
            pomString += (i+1) % 3 === 0 ? s[i] + ' ' : s[i];
        }

        const resultPrice = pomString.split('').reverse().join('');
        let result = price.length > 1
                    ? resultPrice + '.' + price[1].trim()
                    : resultPrice.trim();
        result = result + ' Kč';
        return result.trim();
    }
}
