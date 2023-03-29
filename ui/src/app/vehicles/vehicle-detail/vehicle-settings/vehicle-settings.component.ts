import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/auth.service';
import { VehicleService } from '../../../core/stores/vehicle/vehicle.service';
import { VehicleInfo } from '../../vehicle-stream/vehicle';
import { VehicleImageService } from '../../vehicle-stream/vehicle-images.service';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { Settings, SettingsService } from './settings.service';

@Component({
    selector: 'va-vehicle-settings',
    templateUrl: './vehicle-settings.component.html',
    styleUrls: ['./vehicle-settings.component.scss']
})
export class VehicleSettingsComponent implements OnInit, OnDestroy {
    loading = false;
    isUploading = false;
    vehicle: VehicleInfo;
    vehicleId: string;
    hasBaseDropZoneOver = false;
    settings: Settings;
    units: string;
    units2: string;
    tankCapacity: number;

    url = '/resource/file/new';
    maxFileSize = 6000000;
    options = {
        maxFileSize: this.maxFileSize,
        method: 'post',
        removeAfterUpload: true,
        url: this.url,
        autoUpload: true,
        headers: [{ name: 'Authorization', value: 'Bearer ' + this._auth.accessToken }]
    };

    uploader = new FileUploader(this.options);

    private _onDestroy$ = new Subject();

    constructor(
        private _route: ActivatedRoute,
        private _settings: SettingsService,
        private _toastr: ToastrService,
        private _auth: AuthService,
        private _images: VehicleImageService,
        private _vehicles: VehicleService,
        private _dialog: MatDialog
    ) {
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

        this._vehicles.vehicle
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(v => {
                if (!!v) {
                    this.vehicle = v;
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
        this._dialog
            .open(SettingsFormComponent, {
                width: '600px',
                data: this.vehicle
            })
            .afterClosed()
            .subscribe(v => {
                if (!!v) {
                    this.updateVehicleInfo(v);
                }
            });
    }

    private _onImageDeleteSuccess = () => {
        this._toastr.success('Obrázek byl úspěšně smazán.', 'Hotovo!');
    };

    private _onImageDeleteError = () => {
        this._toastr.error('Obrázek se nepodařilo smazat.', 'Chyba!');
    };

    private updateVehicleInfo(v: Settings) {
        this._vehicles.updateVehicleSubject({
            ...this.vehicle,
            info: {
                ...this.vehicle.info,
                units: v.units,
                subUnits: v.subUnits,
                tankCapacity: v.tankCapacity
            }
        });
    }
}
