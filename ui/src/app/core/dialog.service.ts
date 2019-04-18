import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    Injectable,
    Injector,
    ViewContainerRef
} from '@angular/core';
import {AppComponent} from '../app.component';
import { Observable } from 'rxjs';


export type DialogSubscription = {
    close: () => void;
};

export interface Dialog extends DialogSubscription {
    data: any;
    subscribeToDialog: () => Observable<any>;
}

// TODO: add generic types!
@Injectable()
export class DialogService {

    // app ele ref
    private _appElementRef: ViewContainerRef;
    // dialog ref
    private _dialogRef: ComponentRef<any>;
    // component passed to dialog
    private _componentDialogRef = null;

    constructor(private app: ApplicationRef, private injector: Injector, private resolver: ComponentFactoryResolver) {
    this._appElementRef = app.components.length > 0 ? (<AppComponent>app.components[0].instance).viewContainerRef : null;
        if (this._componentDialogRef) {
            app.components
                .filter(comp => comp instanceof this._componentDialogRef)
                .forEach(comp => comp.destroy());
        }
    }

    dialog(component): DialogFactory {
        this._componentDialogRef = component;
        return new DialogFactory(this);
    }

    private _buildConfirmModal(factory: DialogFactory) {

    if (!!this._dialogRef) {
        this._dialogRef.destroy();
    }

    this._dialogRef = this.resolver
        .resolveComponentFactory(this._componentDialogRef)
        .create(this.injector);

    this._setupConfirmComponent(factory);

    if (this._appElementRef) this._appElementRef.insert(this._dialogRef.hostView);

        // TODO: add subscription and on close, remove dialog from memory!!!

        return this._dialogRef.instance.subscribeToDialog();
    }

    private _setupConfirmComponent(factory: DialogFactory) {
        if ((<any>factory).model) {
            this._dialogRef.instance.data = (<any>factory).model;
        }
    }
}


export class DialogFactory {

    private _service: DialogService;
    private _data: any;

    constructor(service: DialogService) {
        this._service = service;
    }

    data(value) {
        this._data = value;
        return this;
    }

    private get _model() {
        return this._data;
    }

    subscribe(cb?: (value) => void) {
        (<any>this._service)
            ._buildConfirmModal(this)
            .subscribe(cb);
        const self = this;
        return {
            close() {
                (<any>self._service)._dialogRef.instance.close();
            }
        };
    }
}
