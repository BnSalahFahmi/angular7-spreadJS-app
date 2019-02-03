import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class GlobalService {

    private dataSource = new Subject<DataSourceClass>();
    refreshSpreadSheetEvent : Subject<boolean> = new Subject();

    data$ = this.dataSource.asObservable();

    public dataBusChanged(ev, value) {
        this.dataSource.next({
            ev: ev,
            value: value
        })
    }
}


export class DataSourceClass {
    ev: string;
    value: any
}