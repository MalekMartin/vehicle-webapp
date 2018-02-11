import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pageable } from '../../../utils/pageable';

@Component({
    selector: 'va-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent<T> implements OnInit {

    @Input() service: Pageable<T>;

    @Output() selected = new EventEmitter<number>();

    constructor() { }

    ngOnInit() { }

    get currentPage(): number {
        return this.service.currentPage;
    }

    get isLastPage(): boolean {
        const page = this.service.totalPages > 0 ? this.service.totalPages - 1 : 0;
        return this.service.currentPage === page;
    }

    get isFirstPage(): boolean {
        return this.service.currentPage === 0;
    }

    get isLoading(): boolean {
        return this.service.loading;
    }

    get needPaginator(): boolean {
        return this.service.totalPages > 1;
    }

    get pages(): number[] {
        const pages = [];
        const current = this.service.currentPage;
        let actual;
        const maxPages = 5;

        const step = 3;

        const rightSteps = current < step ? maxPages - current : step;
        const leftSteps = current > this.service.totalPages - step  ? maxPages - (this.service.totalPages - current - 1) : step;

        if (current > 0) {
            actual = current - 1;

            while (actual >= 0 && (current - leftSteps) < actual) {
                pages.unshift(actual);
                actual -= 1;
            }
        }

        pages.push(current);

        if (current < this.service.totalPages) {
            actual = current + 1;

            while (actual <= this.service.totalPages -1 && (current + rightSteps) > actual) {
                pages.push(actual);
                actual += 1;
            }
        }

        // for (let i = 0; i < this.service.totalPages; i++) {
        //     pages.push(i);
        // }
        return pages;
    }

    prev() {
        this.selected.emit(this.currentPage - 1);
    }

    next() {
        this.selected.emit(this.currentPage + 1);
    }

    page(p: number) {
        this.selected.emit(p);
    }
}
