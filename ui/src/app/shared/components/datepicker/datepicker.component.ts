import { Component, forwardRef, OnDestroy, OnInit, ViewChild, Provider } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { BsDropdownDirective, DatePickerComponent } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const noop = () => {};

export const DATEPICKER_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
};

@Component({
    selector: 'va-date-picker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    providers: [DATEPICKER_CONTROL_VALUE_ACCESSOR]
})
export class DatepickerComponent implements OnInit, OnDestroy, ControlValueAccessor {
    dt = new FormControl();

    @ViewChild(BsDropdownDirective, {static: false}) dropdown: BsDropdownDirective;
    @ViewChild(DatePickerComponent, {static: false}) datepicker: DatePickerComponent;

    private _onDestroy$ = new Subject();
    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    ngOnInit() {
        this.dt.valueChanges.pipe(takeUntil(this._onDestroy$)).subscribe(v => {
            this.onChangeCallback(v);
        });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get isOpen(): boolean {
        return !this.dropdown || this.dropdown.isOpen;
    }

    set isOpen(value: boolean) {
        if (!!this.dropdown) {
            this.dropdown.isOpen = value;
        }
    }

    clear() {
        this.isOpen = false;
        this.dt = undefined;
        this.onChangeCallback(null);
    }

    onToggle(isOpen: boolean) {
        this.onTouchedCallback();
        if (!isOpen && !!this.dt.value) {
            this.onChangeCallback(moment(this.dt.value).toDate());
        }
    }

    // From ControlValueAccessor interface
    writeValue(value: any) {
        if (!!value) {
            this.dt.setValue(moment(value).toDate(), { emitEvent: false });
        }
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
