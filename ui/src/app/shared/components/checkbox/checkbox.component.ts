import { Component, forwardRef, Input, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StringUtils } from '../../../utils/string.utils';

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
};

@Component({
    selector: 'va-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CheckboxComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input() id = 'v-custom-checkbox-' + StringUtils.guid();

    checkboxControl = new FormControl();
    // The internal data model
    private _innerValue = false;
    private _onDestroy$ = new Subject();

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    ngOnInit() {
        this.checkboxControl.valueChanges.pipe(takeUntil(this._onDestroy$)).subscribe(v => {
            this._innerValue = v;
            this.onChangeCallback(v);
        });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    // From ControlValueAccessor interface
    writeValue(value: boolean) {
        if (value !== this._innerValue) {
            this._innerValue = value;
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
