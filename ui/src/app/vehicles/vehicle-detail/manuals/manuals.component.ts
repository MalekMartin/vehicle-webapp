import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'va-manuals',
    templateUrl: './manuals.component.html',
    styleUrls: ['./manuals.component.scss']
})

export class ManualsComponent implements OnInit {

    formUrl = this._form.group({
        title: [''],
        url: ['', Validators.required]
    });

    constructor(private _form: FormBuilder) { }

    ngOnInit() { }
}
