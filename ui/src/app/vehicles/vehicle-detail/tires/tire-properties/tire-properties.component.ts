import { Component, OnChanges, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TiresService } from '../tires.service';
import { Property } from '../_core/property';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { TirePropertiesFormService } from '../tire-properties-form/tire-properties-form.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { PropertyExt } from '../tires.interface';

@Component({
    selector: 'va-tire-properties',
    templateUrl: './tire-properties.component.html',
    styleUrls: ['./tire-properties.component.scss'],
    animations: [
        trigger('delete', [
            state('active', style({transform: 'translateX(0)'})),
            state('deleted', style({transform: 'translateX(-100%)', display: 'none'})),
            transition('active => deleted', animate('200ms ease-in')),
        ]),
        trigger('add', [
            // state('void', style({transform: 'translateX(-100%)'})),
            // state('void', style({transform: 'translateX(0)'})),
            state('hidden', style({transform: 'translateX(-100%)'})),
            state('active', style({transform: 'translateX(0)'})),
            transition('hidden => active', animate('200ms ease')),
        ])
    ]
})
export class TirePropertiesComponent implements OnInit {

    @Input() set vehicleId(id: string) {
        this._vehicleId = id;
    }

    @Input() set properties(props: PropertyExt[]) {
        this._properties = props;
        setTimeout(() => {
            if (!!props) {
                this._properties.forEach((p, i) => {
                    if (p.status === 'hidden') {
                        this._properties[i].status = 'active';
                    }
                });
            }
        });
    }

    @Output() changed = new EventEmitter();

    private _vehicleId: string;
    private _properties: PropertyExt[];
    private _propSubs: Subscription;

    constructor(private _tire: TiresService,
                private _form: FormBuilder,
                private _toastr: ToastsManager,
                private _dialog: TirePropertiesFormService) { }

    ngOnInit() {
    }

    get vehicleId(): string {
        return this._vehicleId;
    }

    get properties(): PropertyExt[] {
        return this._properties;
    }

    edit(prop) {
        this._dialog.dialog
            .property(prop)
            .title('Úprava parametru')
            .subscribe(res => {
                if (res.result) {
                    this._tire.updateProperty(res.form)
                        .subscribe(this._onUpdateSuccess, this._onAddError);
                }
            });
    }

    delete(prop: PropertyExt) {
        prop.status = 'deleted';
    }

    finishDeletion(prop: PropertyExt, $event) {
        if (prop.status === 'deleted' && $event.toState === 'deleted') {
            this._tire.deleteProperty(prop)
                .subscribe(() => {
                    this._toastr.success('Parametr byl úspěšně smazán','Hotovo!');
                    const i = this.properties.findIndex(p => p.id === prop.id);
                    this.properties.splice(i, 1);
                },() => {
                    this._toastr.error('Parametr nebyl smazán', 'Chyba!');
                    prop.status = 'active';
                });
        }
    }

    private _onAddError = () => {
        this._toastr.error('Parametr nebyl uložen.');
    }

    private _onUpdateSuccess = () => {
        this._toastr.success('Parametr byl úspěšně upraven.');
        this.changed.emit();
    }

    private _onDeleteSuccess = () => {
        this._toastr.success('Parametr byl úspěšně smazán','Hotovo!');
        this.changed.emit();
    }

}

