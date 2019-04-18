import { VehicleFilterPipe } from './vehicle-filter.pipe';
import { vehicleMock } from '../../vehicles/vehicle-stream/vehicle.service.spec';
import * as _ from 'lodash';
import { Vehicle } from '../../vehicles/vehicle-stream/vehicle';

const vehicleMock2: Vehicle = {
    ...vehicleMock,
    id: 'test-vehicle-2',
    brand: 'Renoult',
    model: 'Laguna II'
};

const vehiclesMock = [vehicleMock, vehicleMock2];

describe('VehicleFilterPipe', () => {
    let pipe: VehicleFilterPipe;

    beforeEach(() => {
        pipe = new VehicleFilterPipe();
    });

    it('Should return empty array for undefined value', () => {
        expect(pipe.transform(undefined)).toEqual([]);
    });

    it('Should return value for empty query', () => {
        expect(pipe.transform(vehiclesMock)).toEqual(vehiclesMock);
    });

    it('Should filter vehicles', () => {
        expect(pipe.transform(vehiclesMock, 'KT')).toEqual([vehiclesMock[0]]);
    });
});
