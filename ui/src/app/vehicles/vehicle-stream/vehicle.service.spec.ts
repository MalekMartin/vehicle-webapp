import { TestBed, inject } from '@angular/core/testing';
import { ToastsManager, ToastModule, ToastOptions } from 'ng6-toastr/ng2-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { HttpModule, XHRBackend, Response, ResponseOptions  } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { CoreModule } from '../../core/core.module';
import { mockBackendResponse, apiBaseUrl } from '../../../testing/http';

describe('VehicleService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                RouterTestingModule,
                CoreModule.forRoot(),
                ToastModule
            ],
            providers: [
                ToastsManager,
                ToastOptions,
                VehicleService,
                { provide: XHRBackend, useClass: MockBackend },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
    });

    it('should return all vehicles', inject([VehicleService], (vehicleService: VehicleService) => {

        const vehiclesMock = [{
            id: '132',
            brand: 'Renault',
            model: 'Laguna II'
        }];

        (<any>vehicleService)._vehicles = vehiclesMock;

        expect(vehicleService.allVehicles).toEqual(vehiclesMock);
    }));

    it('should call add vehicle post method', inject([VehicleService]
        , (vehicleService: VehicleService) => {

        const spy = spyOn((<any>vehicleService)._http, 'post');

        const value = vehicleMock;

        vehicleService.addVehicle(value);

        expect(spy).toHaveBeenCalled();
    }));

    it('should call get vehicle info get method', inject([VehicleService]
        , (vehicleService: VehicleService) => {

        const spy = spyOn((<any>vehicleService)._http, 'get');

        const value = 'vehicle-id';

        vehicleService.getInfo(value);

        expect(spy).toHaveBeenCalled();
    }));

    it('should call delete vehicle delete method', inject([VehicleService]
        , (vehicleService: VehicleService) => {

        const spy = spyOn((<any>vehicleService)._http, 'delete');

        const value = 'vehicle-id';

        vehicleService.deleteVehicle(value);

        expect(spy).toHaveBeenCalled();
    }));

    it('should call get method on refresh', inject([VehicleService]
        , (vehicleService: VehicleService) => {

        const backend: MockBackend = TestBed.get(XHRBackend);

        backend.connections
            .subscribe((connection: MockConnection) => {
                const {url} = connection.request;
                if (url === 'resource/vehicles') {
                    mockBackendResponse(connection, JSON.stringify([vehicleMock]));
                }

            });

        vehicleService.refresh();

        expect((<any>vehicleService)._vehicles).not.toBeNull();
        expect((<any>vehicleService)._vehicles).toEqual([vehicleMock]);
    }));

});

export const vehicleMock = {
    id: '1',
    brand: 'KTM',
    model: 'EXC-F 350',
    manufactureYear: 2015,
    purchaseDate: '2015-07-16T22:00:00.000Z',
    price: 224000,
    mileage: 0,
    engineHours: 0,
    spz: 'xxx',
};
