import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleStreamComponent } from './vehicle-stream.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
    HttpModule,
    XHRBackend,
    ConnectionBackend,
    ResponseOptions,
    Response
} from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../core/core.module';
import { VehicleService } from './vehicle.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ToastsManager, ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import {
    ConfirmDialogService
} from '../../shared/components/confirm-dialog/confirm-dialog.service';
import { VehicleFilterPipe } from '../../shared/pipes/vehicle-filter.pipe';
import {
    ConfirmDialogServiceStub
} from '../../shared/components/confirm-dialog/confirm-dialog.spec';
import { vehicleMock } from './vehicle.service.spec';
import { mockBackendResponse } from '../../../testing/http';
import { OrderByDatePipe } from '../../shared/pipes/order-by-date.pipe';

describe('VehicleStreamComponent', () => {

    let fixture: ComponentFixture<VehicleStreamComponent>;
    let component: VehicleStreamComponent;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                RouterTestingModule,
                CoreModule.forRoot(),
                ToastModule,
            ],
            declarations: [
                VehicleStreamComponent,
                VehicleFilterPipe,
                OrderByDatePipe,
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                VehicleService,
                { provide: XHRBackend, useClass: MockBackend },
                ConnectionBackend,
                ToastsManager,
                ToastOptions,
                { provide: ConfirmDialogService, useClass: ConfirmDialogServiceStub }
            ]
        });

        fixture = TestBed.createComponent(VehicleStreamComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should set default values', () => {
        expect(component.expanded).toBeFalsy();
        expect(component.vehicleModal).not.toBeNull();
    });

    it('should return all vehicles', () => {

        Object.defineProperty(
            (<any>component)
                ._service, 'allVehicles', { get: () => [vehicleMock] });

        expect(component.vehicles).toEqual([vehicleMock]);
    });

    it('onDelete - shoul call confirm dialog', () => {

        const spyTitle = spyOn((<any>component)._confirm.dialog, 'title').and.callThrough();
        const spyMessage = spyOn((<any>component)._confirm.dialog, 'message').and.callThrough();
        const spyOk = spyOn((<any>component)._confirm.dialog, 'ok').and.callThrough();
        const spyCancel = spyOn((<any>component)._confirm.dialog, 'cancel').and.callThrough();
        const spySubscribe = spyOn((<any>component)._confirm.dialog, 'subscribe').and.callThrough();

        const vehicleId = 'vehicle-id';

        component.onDelete(vehicleId);

        expect(spyTitle).toHaveBeenCalled();
        expect(spyMessage).toHaveBeenCalled();
        expect(spyOk).toHaveBeenCalled();
        expect(spyCancel).toHaveBeenCalled();
        expect(spySubscribe).toHaveBeenCalled();

    });

    it('onDelete success - should call success toastr', () => {

        const spyToastr = spyOn((<any>component)._toastr, 'success');

        const vehicleId = 'vehicle-id';

        const backend: MockBackend = TestBed.get(XHRBackend);
        backend.connections
            .subscribe((connection: MockConnection) => {
                const url = connection.request.url;
                if (url === 'resource/vehicle/' + vehicleId) {
                    // mockBackendResponse(connection, JSON.stringify(sourceMock));
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }
            });

        component.onDelete(vehicleId);

        expect(spyToastr).toHaveBeenCalled();

    });

    it('onDelete success - should refresh vehicles', () => {

        spyOn((<any>component)._toastr, 'success');
        const spyRefresh = spyOn((<any>component)._service, 'refresh');

        const vehicleId = 'vehicle-id';

        const backend: MockBackend = TestBed.get(XHRBackend);
        backend.connections
            .subscribe((connection: MockConnection) => {
                const url = connection.request.url;
                if (url === 'resource/vehicle/' + vehicleId) {
                    // mockBackendResponse(connection, JSON.stringify(sourceMock));
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }
            });

        component.onDelete(vehicleId);

        expect(spyRefresh).toHaveBeenCalled();

    });

    it('onDelete error - should call error toastr', () => {

        const spyToastr = spyOn((<any>component)._toastr, 'error');

        const errorMock = {
            code: 404,
            error: '',
            message: ''
        };

        spyOn((<any>component)._service, 'deleteVehicle').and.returnValue({ subscribe(cb, cb1) {
            cb1(errorMock);
        } });

        const vehicleId = 'vehicle-id';

        component.onDelete(vehicleId);

        expect(spyToastr).toHaveBeenCalled();

    });
});
