import { PaginationItem } from './pagination.item.model';

export class Paginator {
    // number item previous and next can be sivible
    visibleSiblingNo: number;
    totalItem: number;
    totalPage: number;

    page: number;
    size: number;

    items: PaginationItem[];

    coonstructor() {
        this.items = [];        
    }
}

