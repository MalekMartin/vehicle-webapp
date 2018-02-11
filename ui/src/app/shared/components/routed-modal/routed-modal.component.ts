import {Component} from '@angular/core';

@Component({
    selector: 'va-routed-modal',
    template: `
		<div>
			<router-outlet></router-outlet>
		</div>
  	`
})
export class RoutedModalComponent {
}
