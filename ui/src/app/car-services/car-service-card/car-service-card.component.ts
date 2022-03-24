import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Garage } from '../garage-form/garage-form.component';

@Component({
    selector: 'va-car-service-card',
    templateUrl: './car-service-card.component.html',
    styleUrls: ['./car-service-card.component.scss']
})

export class CarServiceCardComponent implements OnInit {

    @Input() service;

    @Output() edit = new EventEmitter<Garage>();
    @Output() delete = new EventEmitter<Garage>();

    constructor() { }

    ngOnInit() { }
}
