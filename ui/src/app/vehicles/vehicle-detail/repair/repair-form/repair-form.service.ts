import {
    Injectable,
    ViewContainerRef,
    ComponentRef,
    ApplicationRef,
    Injector,
    ComponentFactoryResolver
} from '@angular/core';
import { RepairFormComponent } from './repair-form.component';
import { AppComponent } from '../../../../app.component';
import { Repair } from '../_core/repair.interface';

@Injectable()
export class RepairFormService {

    appElementRef: ViewContainerRef;

    repairFormDialogRef: ComponentRef<RepairFormComponent>;

    constructor(private _app:ApplicationRef,
                private _injector: Injector,
                private _resolver: ComponentFactoryResolver) {

        this.appElementRef = (<any>_app.components[0].instance).viewContainerRef;
        _app.components
            .filter(comp => comp instanceof RepairFormComponent)
            .forEach(comp => comp.destroy());
    }

    get dialog() {
        return new RepairFormDialogFactory(this);
    }

    buildRepairFormModal(factory: RepairFormDialogFactory) {

        if (!!this.repairFormDialogRef) {
            this.repairFormDialogRef.destroy();
        }

        this.repairFormDialogRef = this._resolver
            .resolveComponentFactory(RepairFormComponent)
            .create(this._injector);

        this.setupExcerptComponent(factory);

        this.appElementRef.insert(this.repairFormDialogRef.hostView);
        return this.repairFormDialogRef.instance.subscribeToDialog();
    }

    private setupExcerptComponent(factory: RepairFormDialogFactory) {
        this.repairFormDialogRef.instance.form.patchValue(factory.model.repair);
        this.repairFormDialogRef.instance.title = factory.model.title;
    }

}

export class RepairFormDialogFactory {

    private _repair: Repair;
    private _title: string;

    private _service: RepairFormService;

    constructor(service: RepairFormService) {
        this._service = service;
    }

    title(value: string): RepairFormDialogFactory {
        this._title = value;
        return this;
    }

    repair(value: any): RepairFormDialogFactory {
        this._repair = value;
        return this;
    }

    get model(): RepairFormModel {
        return {
            repair: this._repair,
            title: this._title
        };
    }

    observable() {
        return this._service.buildRepairFormModal(this);
    }

    subscribe(cb: (value: any) => void) {
        this
            ._service
            .buildRepairFormModal(this)
            .subscribe((res) => {
                cb(res);
            });
    }
}

export interface RepairFormModel {
    repair: Repair;
    title: string;
}
