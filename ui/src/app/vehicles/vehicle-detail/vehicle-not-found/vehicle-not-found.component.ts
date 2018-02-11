import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'va-vehicle-not-found',
    styleUrls: ['vehicle-not-found.component.scss'],
    template: `
    <div class='content'>
        <h3>Vozidlo nebylo nalezeno</h3>
        <a [routerLink]="['/']">Zpět na hlavní stranu</a>
    </div>`
})

export class VehicleNotFoundComponent {
}
