import {Observable} from 'rxjs';
import {StringUtils} from './string.utils';
import * as _ from 'lodash';
import { tap } from 'rxjs/operators';

interface ArgumentMap {
    [key: string]: (string | number);
}

export abstract class Pageable<T> {

    private _page: Page<T>;
    private _currentPage = 0;
    private _loading = false;
    private _arguments: ArgumentMap = {};
    private _pageSize = 20;

    public fetchCurrentPage(): Observable<Page<T>> {
        this._loading = true;
        return this.request()
            .pipe(
                tap((page: Page<T>) => {
                    this._page = page;
                    this._loading = false;
                    return page;
                })
            );
    }

    abstract request(): Observable<Page<T>>;

    public fetchPage(page: number): Observable<Page<T>> {
        this._currentPage = page;
        return this.fetchCurrentPage();
    }

    public fetchNextPage(): Observable<Page<T>> {
        if (!!this._page && !this._page.last) {
            this._currentPage++;
        }
        return this.fetchCurrentPage();
    }

    public fetchPreviousPage(): Observable<Page<T>> {
        if (!!this._page && !this._page.first) {
            this._currentPage--;
        }
        return this.fetchCurrentPage();
    }

    public reset(): Observable<Page<T>> {
        this._currentPage = 0;
        return this.fetchCurrentPage();
    }

    public paginationSegment(): string {
        this._arguments['page'] = this._currentPage;
        this._arguments['size'] = this._pageSize;
        return StringUtils.toQuery(this._arguments);
    }

    /**
     * Method without side effects!
     */
    public paginationSegmentPure() {
        return StringUtils.toQuery(this._arguments);
    }

    public setArgument(key: string, value: string) {
        this._arguments[key] = value;
    }

    public clearArguments() {
        this._arguments = {};
    }

    public clearArgument(key: string) {
        delete this._arguments[key];
    }

    public resetPage() {
        this._currentPage = 0;
    }

    get currentPage(): number {
        return this._currentPage;
    }

    get totalPages(): number {
        return !!this._page ? this._page.totalPages : 0;
    }

    get pageSize() {
        return this._pageSize;
    }

    set pageSize(s: number) {
        this._pageSize = s;
    }

    get pages(): number[] {
        return _.range(0, this.totalPages);
    }

    get totalElements(): number {
        return !!this._page ? this._page.totalElements : 0;
    }

    get elements(): number {
        return !!this._page ? this._page.numberOfElements : 0;
    }

    get hasNext(): boolean {
        return !!this._page ? !this._page.last : false;
    }

    get hasPrevious(): boolean {
        return !!this._page ? !this._page.first : false;
    }

    get content(): T[] {
        return !!this._page ? this._page.content : [];
    }

    get loading(): boolean {
        return this._loading;
    }
}

export interface Page<T> {
    content: T[];
    last: boolean;
    first: boolean;
    totalElements: number;
    totalPages: number;
    number: number;
    numberOfElements: number;
    size: number;
    sort: any; // TODO: Extract to separate interface. make this interface commonly accessible from separate file
}
