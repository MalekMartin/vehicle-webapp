import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatNumber'
})

export class NumberFormatPipe implements PipeTransform {
    transform(value: number, unit: string = ''): string {
        if (!value) return !!unit ? '0 ' + unit : '0';

        const numbers = value.toString().split('.');

        let pomString = '';
        const s = numbers[0].split('').reverse();

        for (let i = 0; i < s.length; i++) {
            pomString += (i+1) % 3 === 0 ? s[i] + ' ' : s[i];
        }

        const resultNumber = pomString.split('').reverse().join('');
        let result = numbers.length > 1
                    ? resultNumber + '.' + numbers[1].slice(0, 2)
                    : resultNumber;
        result = unit ? result + ' ' + unit : result;
        return  result.trim();
    }
}
