/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
// import { Ng2BootstrapConfig, Ng2BootstrapTheme, ComponentsHelper } from 'ngx-bootstrap';

import { AppState } from './app.service';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'va-app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // angularclassLogo = 'assets/img/angularclass-avatar.png';
  // name = 'Angular 2 Webpack Starter';
  // url = 'https://twitter.com/AngularClass';

  viewContainerRef: ViewContainerRef;

  constructor(
              // public appState:AppState,
              public toastr: ToastsManager,
              viewContainerRef:ViewContainerRef,
              // componentsHelper:ComponentsHelper
              ) {

      this.viewContainerRef = viewContainerRef;
      this.toastr.setRootViewContainerRef(viewContainerRef);
      // Fix for ng2-bootstrap modals
      // componentsHelper.setRootViewContainerRef(viewContainerRef);
  }

  // ngOnInit() {
  //   console.log('Initial App State', this.appState.state);
  // }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
