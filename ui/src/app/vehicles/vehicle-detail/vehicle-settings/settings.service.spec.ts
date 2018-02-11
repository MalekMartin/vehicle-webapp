import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../core/core.module';
import { ToastsManager, ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { SettingsService } from './settings.service';
import { MockBackend } from '@angular/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SettingsService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                RouterTestingModule,
                CoreModule.forRoot(),
                ToastModule,
            ],
            providers: [
                ToastsManager,
                ToastOptions,
                SettingsService,
                { provide: XHRBackend, useClass: MockBackend },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
    });

    it('getAllImages - should call get method', inject([SettingsService],
        (service: SettingsService) => {

        const spy = spyOn((<any>service).http, 'get');

        service.getAllImages('test');

        expect(spy).toHaveBeenCalled();
    }));

    it('removeImage - shuld call delete method', inject([SettingsService],
        (service: SettingsService) => {

        const spy = spyOn((<any>service).http, 'delete');

        service.removeImage('test');

        expect(spy).toHaveBeenCalled();
    }));

    it('getImageByVehicleId - should call get method', inject([SettingsService],
        (service: SettingsService) => {

        const spy = spyOn((<any>service).http, 'get');

        service.getImageByVehicleId('test');

        expect(spy).toHaveBeenCalled();
    }));

});
