import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/auth.service';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { VehicleImageService } from '../../vehicle-stream/vehicle-images.service';
import { Settings, SettingsService } from './settings.service';

@Component({
    selector: 'va-vehicle-settings',
    templateUrl: './vehicle-settings.component.html',
    styleUrls: ['./vehicle-settings.component.scss']
})
export class VehicleSettingsComponent implements OnInit, OnDestroy {
    loading = false;
    isUploading = false;
    visible = false;

    vehicleId: string;
    hasBaseDropZoneOver = false;

    settings: Settings;

    @ViewChild('formModal') formModal: ModalDirective;

    _url = '/resource/file/new';
    _token: string;

    _maxFileSize = 6000000;

    _options = {
        maxFileSize: this._maxFileSize,
        method: 'post',
        removeAfterUpload: true,
        url: this._url,
        autoUpload: true,
        headers: [{ name: 'Authorization', value: 'Bearer ' + this._auth.accessToken }]
    };

    uploader = new FileUploader(this._options);

    units: string;
    units2: string;
    tankCapacity: number;

    private _onDestroy$ = new Subject();

    constructor(
        private _route: ActivatedRoute,
        private _settings: SettingsService,
        private _toastr: ToastsManager,
        private _auth: AuthService,
        private _images: VehicleImageService,
        private _vehicles: VehicleService
    ) {
        this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
            this.isUploading = false;
            if (filter.name === 'fileSize') {
                this._toastr.error(
                    'Překročil jsi povolenou maximální velikost souboru (' +
                        (this._maxFileSize / (1024 * 1024)).toFixed(2) +
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
    }

    ngOnInit() {
        this.uploader.onCompleteItem = (item, response) => {
            this.isUploading = false;

            if (item.isError) {
                this._toastr.error('Soubor nebyl nahrán.', 'Chyba!');
            }
            if (item.isSuccess) {
                this._toastr.success(
                    'Soubor ' + item.file.name + ' byl úspěšně nahrán.',
                    'Hotovo!'
                );
            }
        };
        this.uploader.clearQueue();

        this._vehicles.state
            .select(s => s.vehicle)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                if (!!v) {
                    this.units = v.info.units;
                    this.units2 = v.info.subUnits;
                    this.tankCapacity = v.info.tankCapacity;
                    this.vehicleId = v.info.id;

                    this.uploader.options.additionalParameter = {
                        vehicleId: v.info.id
                    };
                }
            });
    }

    ngOnDestroy() {
        this._onDestroy$.next();
    }

    get image(): string | null {
        return this.vehicleId ? this._images.getImage(this.vehicleId) : null;
    }

    fileOverBase(status) {
        this.hasBaseDropZoneOver = status;
    }

    deleteImage() {
        this._settings
            .removeImage(this.vehicleId)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onImageDeleteSuccess, this._onImageDeleteError);
    }

    edit() {
        this.visible = true;
        this.formModal.show();
    }

    onSave(model: Settings) {
        this._settings
            .saveSettings(model)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(this._onSettingsSuccess);
    }

    onCancel() {
        this.formModal.hide();
        this.visible = false;
    }

    private _onImageDeleteSuccess = () => {
        this._toastr.success('Obrázek byl úspěšně smazán.', 'Hotovo!');
    };

    private _onImageDeleteError = () => {
        this._toastr.error('Obrázek se nepodařilo smazat.', 'Chyba!');
    };

    private _onSettingsSuccess = (res: Settings) => {
        this._toastr.success('Nastavení bylo uloženo');
        this.formModal.hide();
        this.visible = false;
        this.getVehicleInfo();
    };

    private getVehicleInfo() {
        this._vehicles
            .getInfo(this.vehicleId)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe();
    }
}
