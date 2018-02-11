import { Pipe, PipeTransform } from '@angular/core';
import { Cost } from './cost.interface';

@Pipe({name: 'filterCosts'})

export class CostsPipe implements PipeTransform {
    transform(value: Cost[], args: string[]): Cost[] {
        if (!value) return [];

        if (!args || args.length === 0) return value;

        return value.filter((v) => {
            return args.indexOf(v.category.id) > -1;
        });
    }
}
