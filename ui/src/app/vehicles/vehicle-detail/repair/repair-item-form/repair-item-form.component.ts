import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RepairService } from '../repair.service';
import { RepairTask } from '../_core/repair-task.interface';
import { Repair } from '../_core/repair.interface';
import { Validators, UntypedFormBuilder } from '@angular/forms';

@Component({
    selector: 'va-repair-item-form',
    templateUrl: './repair-item-form.component.html',
    styleUrls: ['./repair-item-form.component.scss']
})

export class RepairItemFormComponent implements OnInit {

    @Input() set repairId(id: string) {
        this.form.get('repairId').setValue(id);
    }

    @Input() set task(t: RepairTask) {
        if (t) {
            this._task = t;

            this.form.setValue({
                id: t.id,
                title: t.title,
                repairId: t.repairId,
                note: t.note,
                quantity: t.quantity,
                priceNoTax: t.priceNoTax,
                price: t.price,
                type: t.type
            });
        }
    }

    @Input() set repair(repair: Repair) {
        if (repair) {
            this._repairId = repair.id;
            this._tax = repair.tax;

            this.form.patchValue({
                repairId: repair.id
            });
        }
    }

    @Output() saved = new EventEmitter;
    @Output() canceled = new EventEmitter;

    form = this._form.group({
        id: [''],
        repairId: ['', Validators.required],
        title: ['', [Validators.required, Validators.maxLength(128)]],
        note: ['', Validators.maxLength(255)],
        quantity: [1, Validators.required],
        priceNoTax: ['', Validators.required],
        price: [0, Validators.required],
        type: ['MATERIAL']
    });

    private _task: RepairTask;
    private _repairId: string;
    private _tax: number;

    constructor(private _form: UntypedFormBuilder,
                private _repairs: RepairService) { }

    ngOnInit() { }

    get task(): RepairTask {
        return this._task;
    }

    get repairId(): string {
        return this._repairId;
    }

    get tax(): number {
        return this._tax;
    }

    save() {
        this.form.patchValue({price: this._calculatePrice()});

        this._repairs
            .addTask(this.form.value)
            .subscribe(this._onUpdateSuccess, this._onUpdateError);
    }

    cancel() {
        // this.reset();
        this.canceled.emit();
    }

    reset() {
        this.form.reset({
            repairId: this.repairId,
            quantity: 1,
            priceNoTax: 0,
            price: 0
        });
    }

    private _calculatePrice() {
        if (!!this._tax && this._tax > 0) {
            return this.form.value.priceNoTax * ((this._tax /100) + 1);
        } else {
            return this.form.value.priceNoTax;
        }
    }

    private _onUpdateSuccess = () => {
        this.saved.emit(true);
        this.reset();
    }

    private _onUpdateError = () => {
        this.saved.emit(false);
    }
}
