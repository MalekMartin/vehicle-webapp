import { Pipe, PipeTransform } from '@angular/core';
import { Tire, TireStatus } from '../tires.interface';

@Pipe({
    name: 'tireStatusFilter'
})
export class TireStatusFilterPipe implements PipeTransform {
    transform(value: Tire[], status: TireStatus): Tire[] {
        if (!value) return [];

        if (!status) return value;

        return value.filter(t => t.status === status);
    }
}
