import {
  inject,
  TestBed
} from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ViewContainerRef, DebugElement } from '@angular/core';

// Load the implementations that should be tested
import { AppComponent } from './app.component';
import { AppState } from './app.service';
import { ToastsManager, ToastModule, ToastOptions } from 'ng6-toastr/ng2-toastr';
import { ComponentFixture } from '@angular/core/testing';

describe('App', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastModule],
      providers: [
        AppComponent,
        ToastsManager,
        ToastOptions,
        ViewContainerRef,
      ],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should set viewContainerRef', () => {
    expect((<any>component).viewContainerRef).not.toBeNull();
  });
});
