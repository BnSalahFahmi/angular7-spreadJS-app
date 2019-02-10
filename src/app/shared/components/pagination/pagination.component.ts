import { Component, EventEmitter, Output, Input, OnInit } from "@angular/core";
import { Paginator } from "../../models/pagination/paginator.model";
import { PaginationService } from "../../services/pagination.service";

@Component({
    selector: 'app-pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.scss']
})

export class PaginationComponent implements OnInit {

    @Input()
    paginator: Paginator;

    @Input()
    size: number;

    @Input()
    sizes: any;

    @Output() changePageEvent = new EventEmitter();
    @Output() changeSizeEvent = new EventEmitter();

    constructor(
        private paginationService: PaginationService
    ) { }

    ngOnInit(): void {
        this.paginator.size = this.size;
    }

    onClickPageChange(index: number): void {
        const pageClicked = this.paginator.items[index];
        this.paginationService.onEventGoPage(this.paginator, pageClicked.name);
        this.changePageEvent.emit({
            'page': this.paginator.page,
            'size': this.paginator.size,
        });
    }

    onSelectChangeSize(): void {
        this.paginator = this.paginationService.createPaginatorFromCount(this.paginator.totalItem, this.paginator.size);
        this.changeSizeEvent.emit({
            'page': this.paginator.page,
            'size': this.paginator.size,
        });
    }

}

