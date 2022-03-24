import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../core/core.module';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { SettingsService } from './settings.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('SettingsService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterTestingModule,
                CoreModule.forRoot(),
                ToastrModule,
            ],
            providers: [
                ToastrService,
                SettingsService,
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
