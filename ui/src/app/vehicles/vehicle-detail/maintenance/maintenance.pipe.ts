import { Pipe, PipeTransform } from '@angular/core';
import { Maintenance } from '../../../shared/api/maintenance/maintenance.interface';

@Pipe({name: 'filterMaintenance'})

export class MaintenancePipe implements PipeTransform {
    transform(value: Maintenance[], query: string): Maintenance[] {

        if (!query) return value;

        if (!value) return [];

        return value.filter((m) => {
            return m.status === query;
        });
    }
}
