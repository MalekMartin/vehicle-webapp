import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RepairService } from '../repair.service';
import { RepairTask } from '../_core/repair-task.interface';
import { Repair } from '../_core/repair.interface';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'va-repair-task-form',
    templateUrl: './repair-task-form.component.html',
    styleUrls: ['./repair-task-form.component.scss']
})

export class RepairTaskFormComponent implements OnInit {

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
                price: t.price
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
        priceNoTax: [0, Validators.required],
        price: [0, Validators.required]
    });

    private _task: RepairTask;
    private _repairId: string;
    private _tax: number;

    constructor(private _form: FormBuilder,
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
