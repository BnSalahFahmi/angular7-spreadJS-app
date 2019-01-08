import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Transaction } from "../models/transaction.model";
import * as url from '../../../environments/environment';
import { of, Observable } from 'rxjs';
import { map, catchError, publishLast, refCount } from 'rxjs/operators';

@Injectable()
export class TransactionService {

    baseUrl : string = url.environment.API_PATH + '/TransactionController';
    list$: Observable<Transaction[]>;

    constructor(private http: HttpClient){
        // keep in cache the last result  
        this.list$ = this.http.get<Transaction[]>(this.baseUrl + '/').pipe(map(response => response), publishLast(), refCount());
    }

    fetchTransactions(): Observable<Transaction[]>{
        return this.list$;
    }

    addTransaction(transaction){
        return this.http.post<Observable<Transaction>>(this.baseUrl + '/', transaction);
    }

    getTransaction(transaction){
        return this.http.get<Observable<Transaction>>(this.baseUrl + '/', transaction);
    }

    deleteTransaction(transactionId){
        return this.http.delete<Observable<Transaction>>(this.baseUrl + '/' + transactionId);
    }
}