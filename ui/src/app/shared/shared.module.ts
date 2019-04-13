import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDropdownModule, DatepickerModule, ModalModule, TooltipModule } from 'ngx-bootstrap';
import { ApiModule } from './api/api.module';
import { StorageService } from './api/storage.service';
import { CardModule } from './components/card/card.module';
import { CheckboxModule } from './components/checkbox/checkbox.module';
import { ConfirmDialogModule } from './components/confirm-dialog/confirm-dialog.module';
import { InitialsModule } from './components/initials/initials.module';
import { MileageModule } from './components/mileage/mileage.module';
import { NumberStatsModule } from './components/number-stats/number-stats.module';
import { PaginatorModule } from './components/paginator/paginator.module';
import { ProgressModule } from './components/progress/progress.module';
import { RoutedModalModule } from './components/routed-modal/routed-modal.module';
import { SectionHeadingModule } from './components/section-heading/section-heading.module';
import { SlimBarModule } from './components/slim-bar/slim-bar.module';
import { SpinnerModule } from './components/spinner/spinner.module';
import { TopMenuModule } from './components/top-menu/top-menu.module';
import { VehicleIconModule } from './components/vehicle-icon/vehicle-icon.module';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { FormItemModule } from './forms/form-item/form-item.module';

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
    PipesModule,
    CheckboxModule,
    DirectivesModule,
    InitialsModule,
    MileageModule,
    NumberStatsModule,
    PaginatorModule,
    ProgressModule,
    SlimBarModule,
    SpinnerModule,
    TopMenuModule,
    VehicleIconModule,
    FormItemModule
];

@NgModule({
    imports: [...MODULES],
    exports: [...MODULES],
    declarations: [],
    providers: [StorageService]
})
export class SharedModule {}
