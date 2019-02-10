import { Injectable } from '@angular/core';
import { Paginator } from '../models/pagination/paginator.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationItem } from '../models/pagination/pagination.item.model';
import { StatusConstant } from '../constant/status.constant';
import CollectionUtil from '../util/collection.util';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PaginationService {

    constructor(
        private http: HttpClient
    ) { }

    createPaginator(size: number, urlCount: string): Observable<Paginator> {
        return this.http.get(urlCount).pipe(
            map(count => {
                return this.createPaginatorFromCount(parseInt(count.toString(), 10), size);
            })
        );
    }

    createPaginatorFromCount(count: number, size: number) {
        const paginator = new Paginator();
        paginator.visibleSiblingNo = 3;
        paginator.totalItem = count;
        paginator.size = size;
        paginator.page = 0;
        paginator.totalPage = this.calculateNumberPage(paginator.totalItem, paginator.size);
        paginator.items = [];

        // create first and previous page
        paginator.items.push(new PaginationItem('First', StatusConstant.DISABLED));
        paginator.items.push(new PaginationItem('Previous', StatusConstant.DISABLED));

        // create numeric pages
        for (let index = 0; index <= paginator.totalPage; index++) {
            const item = new PaginationItem((index + 1).toString(), StatusConstant.DISABLED);
            item.index = index;
            item.numeric = true;
            paginator.items.push(item);
        }

        // create next and last pages
        paginator.items.push(new PaginationItem('Next', StatusConstant.DISABLED));
        paginator.items.push(new PaginationItem('Last', StatusConstant.DISABLED));

        this.updatePaginator(paginator);
        return paginator;
    }

    getPaginator(size: number, totalItem: number, pageNumber: number, visibleSiblingNo: number, totalPage: number): Paginator {
            const paginator = new Paginator();
            paginator.visibleSiblingNo = visibleSiblingNo;
            paginator.totalItem = totalItem;
            paginator.size = size;
            paginator.page = pageNumber;
            paginator.totalPage = totalPage;
            paginator.items = [];

            // create first and previous page
            paginator.items.push(new PaginationItem('First', StatusConstant.DISABLED));
            paginator.items.push(new PaginationItem('Previous', StatusConstant.DISABLED));

            // create numeric pages
            for (let index = 0; index < paginator.totalPage; index++) {
                const item = new PaginationItem((index + 1).toString(), StatusConstant.DISABLED);
                item.index = index;
                item.numeric = true;
                paginator.items.push(item);
            }

            // create next and last pages
            paginator.items.push(new PaginationItem('Next', StatusConstant.DISABLED));
            paginator.items.push(new PaginationItem('Last', StatusConstant.DISABLED));

            this.updatePaginator(paginator);
            return paginator;
    }

    onEventGoPage(paginator: Paginator, pageName: string): void {
        switch (pageName) {
            case 'First':
                this.goNumeric(paginator, 0);
                return;
            case 'Previous':
                this.goPrevious(paginator);
                return;
            case 'Next':
                this.goNext(paginator);
                return;
            case 'Last':
                this.goNumeric(paginator, paginator.totalPage);
                return;
            default:
                this.goNumeric(paginator, parseInt(pageName, 10) - 1);
        }
    }

    private goNumeric(paginator: Paginator, pageNumber: number): void {
        paginator.page = pageNumber;
        this.updatePaginator(paginator);
    }

    private goNext(paginator: Paginator): void {
        if (paginator.page < paginator.totalPage) {
            paginator.page++;
            this.updatePaginator(paginator);
        }
    }

    private goPrevious(paginator: Paginator): void {
        if (paginator.page > 0) {
            paginator.page--;
            this.updatePaginator(paginator);
        }
    }


    private calculateNumberPage(totalItem: number, size: number): number {
        const totalPage = Math.floor(totalItem / size);
        return totalItem % size === 0 ? totalPage - 1 : totalPage;
    }


    private updatePaginator(paginator: Paginator): void {
        for (let index = 0; index < paginator.items.length; index++) {
            const element = paginator.items[index];
            if (element.numeric) {
                this.updateNumericItem(paginator, element);
            }
        }
        this.updateNonNumericItem(paginator);
    }

    private updateNumericItem(paginator: Paginator, item: PaginationItem): void {
        item.status = StatusConstant.ENABLED;
        const pageNumber = parseInt(item.name, 10);
        if (Math.abs(paginator.page - pageNumber) <= paginator.visibleSiblingNo) {
            item.status = StatusConstant.VISIBLE;
        } else {
            item.status = StatusConstant.HIDDEN;
        }
    }

    private updateNonNumericItem(paginator: Paginator): void {
        const prev = paginator.items[0];
        const first = paginator.items[1];
        const next = paginator.items[paginator.items.length - 2];
        const last = CollectionUtil.getLastElement(paginator.items);
        if (paginator.page === 0) {
            prev.status = StatusConstant.DISABLED;
            first.status = StatusConstant.DISABLED;
            next.status = StatusConstant.ENABLED;
            last.status = StatusConstant.ENABLED;
        } else if (paginator.page === paginator.totalPage) {
            prev.status = StatusConstant.ENABLED;
            first.status = StatusConstant.ENABLED;
            next.status = StatusConstant.DISABLED;
            last.status = StatusConstant.DISABLED;
        }
        else {
            prev.status = StatusConstant.ENABLED;
            first.status = StatusConstant.ENABLED;
            next.status = StatusConstant.ENABLED;
            last.status = StatusConstant.ENABLED;
        }
    }


}


