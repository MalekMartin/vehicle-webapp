import {
    Injectable,
    ViewContainerRef,
    ComponentRef,
    ApplicationRef,
    Injector,
    ComponentFactoryResolver
} from '@angular/core';
import { AppComponent } from '../../../../app.component';
import { Property } from '../_core/property';
import { TirePropertiesFormComponent } from './tire-properties-form.component';

@Injectable()
export class TirePropertiesFormService {

    appElementRef: ViewContainerRef;

    tirePropertiesFormDialogRef: ComponentRef<TirePropertiesFormComponent>;

    constructor(private _app:ApplicationRef,
                private _injector: Injector,
                private _resolver: ComponentFactoryResolver) {

        this.appElementRef = (<any>_app.components[0].instance).viewContainerRef;
        _app.components
            .filter(comp => comp instanceof TirePropertiesFormComponent)
            .forEach(comp => comp.destroy());
    }

    get dialog() {
        return new TirePropertyFormDialogFactory(this);
    }

    buildTirePropertiesFormModal(factory: TirePropertyFormDialogFactory) {

        if (!!this.tirePropertiesFormDialogRef) {
            this.tirePropertiesFormDialogRef.destroy();
        }

        this.tirePropertiesFormDialogRef = this._resolver
            .resolveComponentFactory(TirePropertiesFormComponent)
            .create(this._injector);

        this.setupExcerptComponent(factory);

        this.appElementRef.insert(this.tirePropertiesFormDialogRef.hostView);
        return this.tirePropertiesFormDialogRef.instance.subscribeToDialog();
    }

    private setupExcerptComponent(factory: TirePropertyFormDialogFactory) {
        this.tirePropertiesFormDialogRef.instance.form.patchValue(factory.model.property);
        this.tirePropertiesFormDialogRef.instance.title = factory.model.title;
    }

}

export class TirePropertyFormDialogFactory {

    private _property: Property;
    private _title: string;

    private _service: TirePropertiesFormService;

    constructor(service: TirePropertiesFormService) {
        this._service = service;
    }

    property(value: any): TirePropertyFormDialogFactory {
        this._property = value;
        return this;
    }

    title(value: any): TirePropertyFormDialogFactory {
        this._title = value;
        return this;
    }

    get model(): TirePropertyFormModel {
        return {
            property: this._property,
            title: this._title
        };
    }

    observable() {
        return this._service.buildTirePropertiesFormModal(this);
    }

    subscribe(cb: (value: any) => void) {
        this
            ._service
            .buildTirePropertiesFormModal(this)
            .subscribe((res) => {
                cb(res);
            });
    }
}

export interface TirePropertyFormModel {
    property: Property;
    title: string;
}
