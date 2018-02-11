import { Injectable } from '@angular/core';

@Injectable()
export class CarServiceService {

    private _services: Service[] = [
        {
            id: '',
            name: 'Test',
            address: '',
            city: '',
            zipCode: '',
            web: 'http://',
            phone: '123',
            notes: ''
        },
    ];

    constructor() { }

    get services(): Service[] {
        return this._services;
    }
}

export interface Service {
    id: string;
    name: string;
    address: string;
    city: string;
    zipCode: string;
    web: string;
    phone: string;
    notes: string;
}
