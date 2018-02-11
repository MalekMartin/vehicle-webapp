import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { SingleStatsModel } from '../stats.interface';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Pageable } from '../../../utils/pageable';
import { Cost } from '../../../vehicles/vehicle-detail/costs/cost.interface';

@Injectable()
export class CostsService extends Pageable<Cost> {

    id: string;
    query = '';
    filter: any;

    code = [
        {char: 'a', num: 10},
        {char: 'b', num: 11},
        {char: 'c', num: 12},
        {char: 'd', num: 13},
        {char: 'e', num: 14},
        {char: 'f', num: 15}
    ];

    categorySubject = new ReplaySubject<any>(1);

    private _stream: ConnectableObservable <any>;
    private _categoryStream = new ReplaySubject<any>(1);
    private _categories: any[];
    private _filter: string[] = [];

    constructor(private _http: HttpService) {
        super();
        this.categories().subscribe();
    }

    // get filter(): string[] {
    //     return this._filter;
    // }

    // set filter(f: string[]) {
    //     this._filter = f;
    // }

    request(): any {
        return this._http
            .post('resource/all-costs/' + this.id + '?q=' + this.query + '&' + super.paginationSegment(), this.filter);
    }

    categories(): Observable<any> {
      return this._http
        .get<any>('/resource/cost-category')
        .do((value) => {
          this.categorySubject.next(value);
        });
    }

    getStats(vehicleId) {
        return this._http
            .get('/resource/costs/' + vehicleId + '/stats');
    }

    findCosts(vehicleId:string) {
        return this._http
            .get('/resource/costs/' + vehicleId);
    }

    saveCost(cost:Cost) {
        return this._http
            .post('/resource/costs/update', cost);
    }

    deleteCost(cost:Cost) {
        return this._http
            .delete('/resource/costs/' + cost.id);
    }

    getCategories() {
        return this._http
            .get('/resource/cost-category');
    }

    getCost(id: string) {
        return this._http
            .get(`/resource/cost/${id}`);
    }

    addCategory(category:Category) {
        category.color = !!category.color
                            ? category.color
                            : this.getColorFormString(category.title);
        return this._http
            .post('/resource/cost-category/update', category);
    }

    deleteCategory(category:Category) {
        return this._http
            .delete('/resource/cost-category/' + category.id);
    }

    getColorFormString(s:string):string {
        return this.intToRGB(this.hashCode(s));
    }

    getInverseColor(color:string) {
        const r = color.slice(0,2);
        const g = color.slice(2,4);
        const b = color.slice(4,6);

        const rDec = 255 - parseInt(r, 16);
        const gDec = 255 - parseInt(g, 16);
        const bDec = 255 - parseInt(b, 16);

        return rDec.toString() + gDec.toString() + bDec.toString();
    }

    private hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    }

    private intToRGB(i) {
        const c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        return '00000'.substring(0, 6 - c.length) + c;
    }

    getAllCosts(id: string) {
        return this._http
            .get(`/resource/costs/${id}/all`);
    }

    getCostsByCategory(id: string): Observable<SingleStatsModel[]> {
        return this._http
            .get(`resource/costs/${id}/category-stats`);
    }
}

export interface Category {
    id?:string;
    title:string;
    description:string;
    color?:string;
}
