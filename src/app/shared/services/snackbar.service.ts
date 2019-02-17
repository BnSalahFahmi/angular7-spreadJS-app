import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class SnackBarService {

    private snackEvent = new Subject<Message>();

    data$ = this.snackEvent.asObservable();

    public dataBusChanged(val) {
        this.snackEvent.next({
            title: val.title,
            value: val.value
        })
    }
}


export class Message {
    title: string;
    value: string;
}