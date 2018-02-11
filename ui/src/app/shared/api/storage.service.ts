import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    constructor() { }

    setItem(key: string, data: any) {
        sessionStorage.setItem('va-' + key, JSON.stringify(data));
    }

    getItem(key: string) {
        const data = sessionStorage.getItem('va-' + key);
        if (!!data) {
            return JSON.parse(data);
        } else {
            return null;
        }
    }

    clearItem(key: string) {
        sessionStorage.removeItem(key);
    }

    clearStorage() {
        sessionStorage.clear();
    }
}
