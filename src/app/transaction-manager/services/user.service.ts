import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Transaction } from "../models/transaction.model";
import * as url from '../../../environments/environment';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, publishLast, refCount } from 'rxjs/operators';

@Injectable()
export class UserService {

    baseUrl : string = url.environment.API_PATH + '/UserController';
    list$: Observable<Transaction[]>;
    private _observableList: BehaviorSubject<any[]>;
    private _observableUser: BehaviorSubject<any[]>;
    users : any [] = [
        {
          id: 1,
          name: 'TEMPLATE',
          subTitle: 'the root',
          hasChildren: true
        },
        {
          id: 2,
          name: 'BEN SALAH FAHMI',
          subTitle: 'the second root',
          hasChildren: true
        }
    ];

    userExample: any [] = [
      {
        id: 11,
        name: 'Folder 1',
        subTitle: 'F1',
        children: [
          {
            id: 5,
            name: 'Example ',
            hasChildren: false
          }
        ]
      },
      {
        id: 22,
        name: 'Folder 2',
        subTitle: 'F2',
        hasChildren: false
      }
  ];

    constructor(private http: HttpClient){
        // keep in cache the last result  
        this.list$ = this.http.get<Transaction[]>(this.baseUrl + '/').pipe(map(response => response), publishLast(), refCount());
        this._observableList = new BehaviorSubject(this.users);
        this._observableUser = new BehaviorSubject(this.userExample);
    }

    initUsers() {
        return this._observableList.asObservable();
    }


    addUser(user){
        return this.http.post<Observable<Transaction>>(this.baseUrl + '/', user);
    }

    updateUser(user){
        debugger;
        return this.http.put<Observable<Transaction>>(this.baseUrl + '/', user);
    }

    getUser(userId){
      debugger;
        //return this.http.get<Observable<Transaction>>(this.baseUrl + '/', userId);
        return this._observableUser.asObservable();
    }

    deleteUser(userId){
        return this.http.delete<Observable<Transaction>>(this.baseUrl + '/' + userId);
    }
}