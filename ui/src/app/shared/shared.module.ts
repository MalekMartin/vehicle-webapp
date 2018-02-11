import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { CommonModule } from '@angular/common';
import { PricePipe } from './pipes/price.pipe';
import { FromNowPipe } from './pipes/from-now.pipe';
import { VehicleFilterPipe } from './pipes/vehicle-filter.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ModalModule } from 'ngx-bootstrap';
import { DatepickerModule, TooltipModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { ToHPPipe } from './pipes/to-hp.pipe';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { MomentPipe } from './pipes/moment.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ProgressComponent } from './components/progress/progress.component';
import { WidthDirective } from './directives/width.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { MileageComponent } from './components/mileage/mileage.component';
import { FormItemComponent } from './forms/form-item/form-item.component';
import { ColorFormStringDirective } from './directives/color-from-string.directive';
import { VehicleIconComponent } from './components/vehicle-icon/vehicle-icon.component';
import { FileUploadModule } from 'ng2-file-upload';
import { InitialsComponent } from './components/initials/initials.component';
import { ConfirmDialogModule } from './components/confirm-dialog/confirm-dialog.module';
import { LimitPipe } from './pipes/limit.pipe';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import { RoutedModalModule } from './components/routed-modal/routed-modal.module';
import { CardModule } from './components/card/card.module';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SectionHeadingModule } from './components/section-heading/section-heading.module';
import { NumberStatsComponent } from './components/number-stats/number-stats.component';
import { StorageService } from './api/storage.service';
import { SlimBarComponent } from './components/slim-bar/slim-bar.component';
import { ApiModule } from './api/api.module';

const MODULES = [
    CommonModule,
    RouterModule,
    DatepickerModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    FileUploadModule,
    ConfirmDialogModule,
    RoutedModalModule,
    CardModule,
    SectionHeadingModule,
    TooltipModule,
    ApiModule,
];

const COMPONENTS = [
    TopMenuComponent,
    SpinnerComponent,
    DatepickerComponent,
    CheckboxComponent,
    ProgressComponent,
    MileageComponent,
    FormItemComponent,
    VehicleIconComponent,
    InitialsComponent,
    PaginatorComponent,
    NumberStatsComponent,
    SlimBarComponent,
];

const DIRECTIVES = [
    WidthDirective,
    HighlightDirective,
    ColorFormStringDirective
];

const PIPES = [
    PricePipe,
    FromNowPipe,
    VehicleFilterPipe,
    NumberFormatPipe,
    ToHPPipe,
    MomentPipe,
    LimitPipe,
    OrderByDatePipe,
];

@NgModule({
    imports: [
        ...MODULES
    ],
    exports: [
        ...MODULES,
        ...COMPONENTS,
        ...PIPES,
        ...DIRECTIVES
    ],
    declarations: [
        ...COMPONENTS,
        ...PIPES,
        ...DIRECTIVES
    ],
    providers: [StorageService],
})
export class SharedModule { }
