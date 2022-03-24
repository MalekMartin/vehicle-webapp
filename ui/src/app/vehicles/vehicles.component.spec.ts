import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { VehiclesComponent } from './vehicles.component';
import { VehicleService } from '../core/stores/vehicle/vehicle.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
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
                ToastrModule,
            ],
            declarations: [
                VehiclesComponent
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                ToastrService,
                VehicleService,
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
