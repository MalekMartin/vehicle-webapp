import {
    Injectable,
    ViewContainerRef,
    ComponentRef,
    ApplicationRef,
    Injector,
    ComponentFactoryResolver
} from '@angular/core';
import { AppComponent } from '../../../../app.component';
import { TireStatusFormComponent } from './tire-status-form.component';
import { Tire } from '../tires.interface';

@Injectable()
export class TireStatusDialogService {

    appElementRef: ViewContainerRef;

    tiresStatusDialogRef: ComponentRef<TireStatusFormComponent>;

    constructor(private _app:ApplicationRef,
                private _injector: Injector,
                private _resolver: ComponentFactoryResolver) {

        this.appElementRef = (<any>_app.components[0].instance).viewContainerRef;
        _app.components
            .filter(comp => comp instanceof TireStatusFormComponent)
            .forEach(comp => comp.destroy());
    }

    get dialog() {
        return new TireStatusDialogFactory(this);
    }

    buildConfirmDialogModal(factory: TireStatusDialogFactory) {

        if (!!this.tiresStatusDialogRef) {
            this.tiresStatusDialogRef.destroy();
        }

        this.tiresStatusDialogRef = this._resolver
            .resolveComponentFactory(TireStatusFormComponent)
            .create(this._injector);

        this.setupExcerptComponent(factory);

        this.appElementRef.insert(this.tiresStatusDialogRef.hostView);
        return this.tiresStatusDialogRef.instance.subscribeToDialog();

    }

    private setupExcerptComponent(factory: TireStatusDialogFactory) {
        this.tiresStatusDialogRef.instance.tire = factory.model.tire;
    }

}

export class TireStatusDialogFactory {

    private _tire: Tire;

    private _service: TireStatusDialogService;

    constructor(service: TireStatusDialogService) {
        this._service = service;
    }

    tire(value: Tire): TireStatusDialogFactory {
        this._tire = value;
        return this;
    }

    get model(): TireStatusDialogModel {
        return {
            tire: this._tire,
        };
    }

    observable() {
        return this._service.buildConfirmDialogModal(this);
    }

    subscribe(cb: (value: any) => void) {
        this
            ._service
            .buildConfirmDialogModal(this)
            .subscribe((res) => {
                cb(res);
            });
    }
}

export interface TireStatusDialogModel {
    tire: Tire;
}
