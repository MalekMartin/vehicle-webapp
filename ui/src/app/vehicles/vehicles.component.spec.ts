import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { VehiclesComponent } from './vehicles.component';
import { VehicleService } from '../core/stores/vehicle/vehicle.service';
import { ConnectionBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { XHRBackend } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastsManager, ToastModule, ToastOptions } from 'ng6-toastr/ng2-toastr';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';

describe('VehiclesComponent', () => {

    let fixture: ComponentFixture<VehiclesComponent>;
    let component: VehiclesComponent;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterTestingModule,
                CoreModule.forRoot(),
                ToastModule,
            ],
            declarations: [
                VehiclesComponent
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                ToastsManager,
                ToastOptions,
                VehicleService,
                { provide: XHRBackend, useClass: MockBackend },
                ConnectionBackend,
            ]
        });

        fixture = TestBed.createComponent(VehiclesComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('onInit - should refresh vehicles', () => {

        const spy = spyOn((<any>component)._vehicles, 'refresh');

        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
    });

});
