import {
    Injectable,
    ViewContainerRef,
    ComponentRef,
    ApplicationRef,
    Injector,
    ComponentFactoryResolver
} from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {

    appElementRef: ViewContainerRef;

    confirmDialogRef: ComponentRef<ConfirmDialogComponent>;

    constructor(private _app:ApplicationRef,
                private _injector: Injector,
                private _resolver: ComponentFactoryResolver) {

        this.appElementRef = (<any>_app.components[0].instance).viewContainerRef;
        _app.components
            .filter(comp => comp instanceof ConfirmDialogComponent)
            .forEach(comp => comp.destroy());
    }

    get dialog() {
        return new ConfirmDialogFactory(this);
    }

    buildConfirmDialogModal(factory: ConfirmDialogFactory) {

        if (!!this.confirmDialogRef) {
            this.confirmDialogRef.destroy();
        }

        this.confirmDialogRef = this._resolver
            .resolveComponentFactory(ConfirmDialogComponent)
            .create(this._injector);

        this.setupExcerptComponent(factory);

        this.appElementRef.insert(this.confirmDialogRef.hostView);
        return this.confirmDialogRef.instance.subscribeToDialog();

    }

    private setupExcerptComponent(factory: ConfirmDialogFactory) {
        this.confirmDialogRef.instance.title = factory.model.title;
        this.confirmDialogRef.instance.message = factory.model.message;
        this.confirmDialogRef.instance.ok = factory.model.ok;
        this.confirmDialogRef.instance.cancel = factory.model.cancel;
    }

}

export class ConfirmDialogFactory {

    private _title: string;
    private _message: string;
    private _ok: string;
    private _cancel: string;

    private _service: ConfirmDialogService;

    constructor(service: ConfirmDialogService) {
        this._service = service;
    }

    get model(): ConfirmDialogModel {
        return {
            title: this._title,
            message: this._message,
            ok: this._ok,
            cancel: this._cancel
        };
    }

    title(value: string): ConfirmDialogFactory {
        this._title = value;
        return this;
    }

    message(value: string): ConfirmDialogFactory {
        this._message = value;
        return this;
    }

    ok(value: string): ConfirmDialogFactory {
        this._ok = value;
        return this;
    }

    cancel(value: string): ConfirmDialogFactory {
        this._cancel = value;
        return this;
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

export interface ConfirmDialogModel {
    title: string;
    message: string;
    ok: string;
    cancel: string;
}
