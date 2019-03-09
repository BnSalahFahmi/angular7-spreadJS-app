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
    users : any [] = [
        {
          uuid: 1001,
          name: 'TEMPLATE',
          subTitle: 'the root',
          children: [
            {
              name: 'Folder 1',
              subTitle: 'a bad child',
              children: [
                {
                  uuid: 1003,
                  name: 'Example 1',
                  subTitle: 'subsub',
                  hasChildren: false
                }
              ]
            },
            {
              name: 'Example 2',
              subTitle: 'a bad child',
              hasChildren: false
            }
          ]
        },
        {
          name: 'BEN SALAH FAHMI',
          subTitle: 'the second root',
          children: [
            {
              name: 'Example 3',
              subTitle: 'new and improved',
              uuid: '11',
              hasChildren: false
            }, {
              name: 'Folder 2',
              subTitle: 'new and improved2',
              children: [
                {
                  uuid: 1002,
                  name: 'Example 4',
                  subTitle: 'subsub',
                  hasChildren: false
                }
              ]
            }
          ]
        }
      ];

    constructor(private http: HttpClient){
        // keep in cache the last result  
        this.list$ = this.http.get<Transaction[]>(this.baseUrl + '/').pipe(map(response => response), publishLast(), refCount());
        this._observableList = new BehaviorSubject(this.users);
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
        return this.http.get<Observable<Transaction>>(this.baseUrl + '/', userId);
    }

    deleteUser(userId){
        return this.http.delete<Observable<Transaction>>(this.baseUrl + '/' + userId);
    }
}