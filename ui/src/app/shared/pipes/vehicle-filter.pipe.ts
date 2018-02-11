import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from '../../vehicles/vehicle-stream/vehicle';

@Pipe({
    name: 'vehicleFilter'
})

export class VehicleFilterPipe implements PipeTransform {
    transform(value: Vehicle[], query: string = ''): any {
        if(!value) return [];

        if (!query) return value;

        const q = query.toLowerCase();

        return value.filter(v => {
            return v.brand.toLowerCase().indexOf(q) > -1
                || v.model.toLowerCase().indexOf(q) > -1;
        });
    }
}
