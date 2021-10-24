import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InitialsComponent } from './initials.component';
import { CoreModule } from '../../../core/core.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ColorFormStringDirective } from '../../directives/color-from-string.directive';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('InitialsComponent', () => {

    let fixture: ComponentFixture<InitialsComponent>;
    let component: InitialsComponent;
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CoreModule.forRoot(),
                ToastrModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                InitialsComponent,
                ColorFormStringDirective,
            ],
            providers: [
                ToastrService,
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InitialsComponent);
        component = fixture.componentInstance;
        el = fixture.nativeElement;
    });

    it('should set text if not empty', () => {
        component.text = 'Test';

        expect(component.text).toBe('Test');
    });

    it('should set "?" if text is empty', () => {
        component.text = null;

        expect(component.text).toBe('?');
    });

    it('should set size to default value "l"', () => {
        expect(component.size).toBe('l');
    });

    it('should set color if not empty', () => {
        component.color = '#CCCCCC';
        expect(component.color).toBe('#CCCCCC');
    });

    it('should not set color if empty', () => {
        expect(component.color).toBeUndefined();
    });

    it('should sed char size to 1 when value is 1', () => {
        component.charSize = 1;

        expect(component.charSize).toBe(1);
    });

    it('should sed char size to 2 when value is 2', () => {
        component.charSize = 2;

        expect(component.charSize).toBe(2);
    });

    it('should sed char size to 2 when value > 2', () => {
        component.charSize = 3;

        expect(component.charSize).toBe(2);
    });

    it('should sed char size to 2 when value < 1', () => {
        component.charSize = 0;

        expect(component.charSize).toBe(2);
    });

    it('should return "?" when text is empty', () => {
        component.text = null;

        fixture.detectChanges();

        const avatar = el.querySelector('.icon') as HTMLDivElement;

        expect(component.letters).toBe('?');
        expect(avatar.innerText).toContain('?');
    });

    it('should return "T" when text for "Test"', () => {
        component.text = 'Test';
        component.charSize = 1;

        fixture.detectChanges();

        const avatar = el.querySelector('.icon') as HTMLDivElement;

        expect(component.letters).toBe('T');
        expect(avatar.innerText).toContain('T');
    });

    it('should return "T" when text for "Test Test"', () => {
        component.text = 'Test Test';
        component.charSize = 1;

        fixture.detectChanges();

        const avatar = el.querySelector('.icon') as HTMLDivElement;

        expect(component.letters).toBe('T');
        expect(avatar.innerText).toContain('T');
    });

    it('should return "Te" when text for "Test"', () => {
        component.text = 'Test';
        component.charSize = 2;

        fixture.detectChanges();

        const avatar = el.querySelector('.icon') as HTMLDivElement;

        expect(component.letters).toBe('Te');
        expect(avatar.innerText).toContain('Te');
    });

    it('should return "TT" when text for "Test Test"', () => {
        component.text = 'Test Test';
        component.charSize = 2;

        fixture.detectChanges();

        const avatar = el.querySelector('.icon') as HTMLDivElement;

        expect(component.letters).toBe('TT');
        expect(avatar.innerText).toContain('TT');
    });

});
