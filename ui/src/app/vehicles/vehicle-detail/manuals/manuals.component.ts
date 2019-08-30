import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileItem, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { AuthService } from '../../../core/auth.service';
import { ToastsManager } from 'ng6-toastr';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ManualService } from './manual.service';
import { Manual } from './manual.interface';

@Component({
    selector: 'va-manuals',
    templateUrl: './manuals.component.html',
    styleUrls: ['./manuals.component.scss']
})
export class ManualsComponent implements OnInit, OnDestroy {
    isUploading = false;
    hasBaseDropZoneOver = false;

    formUrl = this._form.group({
        title: [''],
        url: ['', Validators.required]
    });

    url = '/resource/manual/new';
    maxFileSize = 1024 * 1024 * 24;
    options = {
        maxFileSize: this.maxFileSize,
        method: 'post',
        removeAfterUpload: true,
        url: this.url,
        autoUpload: false,
        headers: [{ name: 'Authorization', value: 'Bearer ' + this._auth.accessToken }]
    };

    uploader = new FileUploader(this.options);
    manuals: Manual[];

    private _onDestroy$ = new Subject();

    constructor(
        private _form: FormBuilder,
        private _auth: AuthService,
        private _toastr: ToastsManager,
        private _vehicleService: VehicleService,
        private _manualService: ManualService
    ) {}

    ngOnInit() {

        this._vehicleService.state.select(s => s.vehicle.info.id)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(id => {
                this.uploader.options.additionalParameter = {
                    vehicleId: id
                };
                this.getManuals(id)
            });

        this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
            this.isUploading = false;
            if (filter.name === 'fileSize') {
                this._toastr.error(
                    'Překročil jsi povolenou maximální velikost souboru (' +
                        (this.maxFileSize / (1024 * 1024)).toFixed(2) +
                        'MB).',
                    'Soubor je příliš velký!'
                );
            }
        };

        this.uploader.onBeforeUploadItem = (fileitem: FileItem) => {
            this.isUploading = true;
            this.uploader.options.headers[0] = {
                name: 'Authorization',
                value: 'Bearer ' + this._auth.accessToken
            };
        };

        this.uploader.onErrorItem = (item, response, status) => {
            this.isUploading = false;
            this._toastr.error('Soubor se nepodařilo nahrát.', 'Chyba!');
        }

        this.uploader.onSuccessItem = (item, response, status) => {
            this.isUploading = false;
        }
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    fileOverBase(status: boolean) {
        this.hasBaseDropZoneOver = status;
    }

    getManuals(id: string) {
        this._manualService.getManuals(id)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(m => {
                this.manuals = m;
            });
    }
}
