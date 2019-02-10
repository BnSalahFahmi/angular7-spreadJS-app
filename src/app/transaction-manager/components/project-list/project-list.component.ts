import { Component, OnInit, Directive, ViewChildren, Input, Output, EventEmitter, QueryList } from '@angular/core';
import { Paginator } from '../../../shared/models/pagination/paginator.model';
import { PaginationService } from '../../../shared/services/pagination.service';
import { TableSortableHeader } from '../../../shared/directives/tableSortableHeader.directive';

interface Project {
  id?: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}

const PROJECTS: Project[] = [];

export type SortDirection = 'asc' | 'desc' | '';
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  @ViewChildren(TableSortableHeader) headers: QueryList<TableSortableHeader>;

  tableData: Array<any>;
  page = 1;
  pageSize = 4;
  collectionSize = PROJECTS.length;
  paginator: Paginator;

  DATA = [
    {
      id: 1,
      recovered_id: 12,
      project_id: 50,
      project_name: 'Test 1'
    },
    {
      id: 2,
      recovered_id: 15,
      project_id: 100,
      project_name: 'Test 2'
    }
  ];

  constructor(protected paginationService?: PaginationService) {
    this.paginator = new Paginator();
    this.paginator.items = [];
  }

  get projects(): any[] {
    return this.DATA
      .map((project, i) => ({ id: i + 1, ...project }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit() {
    this.paginationService.createPaginator(10, 'url')
      .subscribe(
        pagi => this.paginator = pagi,
        () => { console.log('aaaa') });
    this.loadData();
  }

  loadData() {
    this.tableData = this.DATA;
  }

  pageChanged(pN: number): void {
    this.page = pN;
  }

  onSort({ column, direction }: SortEvent) {
    debugger;
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '') {
      this.tableData = this.DATA;
    } else {
      this.tableData = [...this.DATA].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
