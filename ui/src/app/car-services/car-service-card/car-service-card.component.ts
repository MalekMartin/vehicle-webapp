import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'va-car-service-card',
    templateUrl: './car-service-card.component.html',
    styleUrls: ['./car-service-card.component.scss']
})

export class CarServiceCardComponent implements OnInit {

    @Input() service;

    @Output() deleted = new EventEmitter;

    constructor() { }

    ngOnInit() { }
}
