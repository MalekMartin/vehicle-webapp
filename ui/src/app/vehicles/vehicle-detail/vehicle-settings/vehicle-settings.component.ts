import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FileUploader, FileUploaderOptions, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SettingsService, Settings } from './settings.service';
import { AuthService } from '../../../core/auth.service';
import { VehicleImageService } from '../../vehicle-stream/vehicle-images.service';
import { VehicleService } from '../../vehicle-stream/vehicle.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'va-vehicle-settings',
    templateUrl: './vehicle-settings.component.html',
    styleUrls: ['./vehicle-settings.component.scss']
})
export class VehicleSettingsComponent implements OnInit, OnDestroy {

    loading = false;
    isUploading = false;
    visible = false;

    vehicleId:string;
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
        headers: [{name: 'Authorization', value: 'Bearer ' + this._auth.accessToken}]
    };

    uploader = new FileUploader(this._options);

    private _infoSubs: Subscription;

    constructor(private _route: ActivatedRoute,
                private _settings: SettingsService,
                private _toastr: ToastsManager,
                private _auth: AuthService,
                private _images: VehicleImageService,
                private _vehicles: VehicleService) {

        this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
            this.isUploading = false;
            if (filter.name === 'fileSize') {
                this._toastr.error('Překročil jsi povolenou maximální velikost souboru ('
                    + (this._maxFileSize / (1024 * 1024)).toFixed(2)
                    + 'MB).','Soubor je příliš velký!');
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
        this.vehicleId = this._route.snapshot.parent.params['id'];
        this.uploader.options.additionalParameter = {
            vehicleId: this.vehicleId
        };

        this.uploader.onCompleteItem = (item, response) => {
            this.isUploading = false;

            if (item.isError) {
                this._toastr.error('Soubor nebyl nahrán.','Chyba!');
            }
            if (item.isSuccess) {
                this._toastr.success('Soubor ' + item.file.name + ' byl úspěšně nahrán.','Hotovo!');
            }
        };
        this.uploader.clearQueue();
    }

    ngOnDestroy() {
        if (this._infoSubs) {
            this._infoSubs.unsubscribe();
        }
    }

    get units(): string {
        return this._vehicles.units;
    }

    get units2(): string {
        return this._vehicles.Units2;
    }

    get image(): string | null {
        return this.vehicleId ? this._images.getImage(this.vehicleId) : null;
    }

    get tankCapacity(): number {
        return this._vehicles.tankCapacity;
    }

    fileOverBase(status) {
        this.hasBaseDropZoneOver = status;
    }

    deleteImage() {
        this._settings
            .removeImage(this.vehicleId)
            .subscribe(this._onImageDeleteSuccess, this._onImageDeleteError);
    }

    edit() {
        this.visible = true;
        this.formModal.show();
    }

    onSave(model: Settings) {
        this._settings
            .saveSettings(model)
            .subscribe(this._onSettingsSuccess);
    }

    onCancel() {
        this.formModal.hide();
        this.visible = false;
    }

    private _onImageDeleteSuccess = () => {
        this._toastr.success('Obrázek byl úspěšně smazán.', 'Hotovo!');
    }

    private _onImageDeleteError = () => {
        this._toastr.error('Obrázek se nepodařilo smazat.', 'Chyba!');
    }

    private _onSettingsSuccess = (res: Settings) => {
        this._toastr.success('Nastavení bylo uloženo');
        this.formModal.hide();
        this.visible = false;
        this.getVehicleInfo();
    }

    private getVehicleInfo() {
        this._infoSubs = this._vehicles.getInfo(this.vehicleId).subscribe();
    }
}
