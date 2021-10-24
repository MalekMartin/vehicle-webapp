import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiclePreviewComponent } from './vehicle-preview.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../../../core/core.module';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { MomentPipe } from '../../../shared/pipes/moment.pipe';
import { FromNowPipe } from '../../../shared/pipes/from-now.pipe';
import { PricePipe } from '../../../shared/pipes/price.pipe';
import { NumberFormatPipe } from '../../../shared/pipes/number-format.pipe';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { SettingsService } from '../../vehicle-detail/vehicle-settings/settings.service';
import { vehicleMock } from '../../../core/stores/vehicle/vehicle.service.spec';
import { HttpClientModule } from '@angular/common/http';

describe('VehiclePreviewComponent', () => {
    let fixture: ComponentFixture<VehiclePreviewComponent>;
    let component: VehiclePreviewComponent;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterTestingModule, CoreModule.forRoot(), ToastrModule],
            declarations: [
                VehiclePreviewComponent,
                MomentPipe,
                FromNowPipe,
                PricePipe,
                NumberFormatPipe
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                VehicleService,
                SettingsService,
                ToastrService,
            ]
        });

        fixture = TestBed.createComponent(VehiclePreviewComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('onInit - should call getImageByVehicleId', () => {
        const spy = spyOn((<any>component)._settings, 'getImageByVehicleId').and.callThrough();

        component.vehicle = { ...vehicleMock };

        fixture.detectChanges();

        expect(spy).toHaveBeenCalledWith(vehicleMock.id);
    });

    it('onInit - should set vehicle image', () => {
        const imageMock = 'data...';

        spyOn((<any>component)._settings, 'getImageByVehicleId').and.returnValue({
            subscribe(cb, cb1) {
                cb(imageMock);
            }
        });

        const vehicle = {
            ...vehicleMock,
            id: 'test-vehicle-1'
        };

        component.vehicle = vehicle;

        fixture.detectChanges();

        expect(component.image).toBe(imageMock);
    });

    it('calculateOdo - should return correct result', () => {
        const before = '1000';
        const after = '1200';

        const result = component.calculateOdo(before, after);

        expect(result).toBe(200);
    });

    it('calculateOdo - should return 0 for negative result', () => {
        const before = '1200';
        const after = '1000';

        const result = component.calculateOdo(before, after);

        expect(result).toBe(0);
    });

    it('calculateOdo - should substitute 0 for undefined "before" value', () => {
        const before = undefined;
        const after = '1000';

        const result = component.calculateOdo(before, after);

        expect(result).toBe(1000);
    });

    it('calculateOdo - should substitute 0 for undefined "now" value', () => {
        const before = '1000';
        const after = undefined;

        const result = component.calculateOdo(before, after);

        expect(result).toBe(0);
    });

    it('calculateOdo - should return 0 for undefined values', () => {
        const before = undefined;
        const after = undefined;

        const result = component.calculateOdo(before, after);

        expect(result).toBe(0);
    });

    it('calculateHours - should return correct result', () => {
        const before = '1.0';
        const after = '2.0';

        const result = component.calculateHours(before, after);

        expect(result).toBe('1.0');
    });

    it('calculateHours - should return 0 for negative result', () => {
        const before = '2.0';
        const after = '1.0';

        const result = component.calculateHours(before, after);

        expect(result).toBe(0);
    });

    it('calculateHours - should return correct result for undefined value "before"', () => {
        const before = undefined;
        const after = '1.0';

        const result = component.calculateHours(before, after);

        expect(result).toBe('1.0');
    });

    it('calculateHours - should return correct result for undefined value "now"', () => {
        const after = undefined;
        const before = '1.0';

        const result = component.calculateHours(before, after);

        expect(result).toBe(0);
    });

    it('calculateHours - should return 0 for undefined values', () => {
        const after = undefined;
        const before = undefined;

        const result = component.calculateHours(before, after);

        expect(result).toBe('0.0');
    });
});
