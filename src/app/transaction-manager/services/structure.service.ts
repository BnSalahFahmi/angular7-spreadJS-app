import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Structure } from "../models/Structure.model";
import * as url from '../../../environments/environment';
import { of, Observable } from 'rxjs';
import { map, catchError, publishLast, refCount } from 'rxjs/operators';

@Injectable()
export class StructureService {

    baseUrl : string = url.environment.API_PATH + '/StructureController';
    list$: Observable<Structure[]>;

    constructor(private http: HttpClient){
        // keep in cache the last result  
        this.list$ = this.http.get<Structure[]>(this.baseUrl + '/').pipe(map(response => response), publishLast(), refCount());
    }

    fetchStructures(): Observable<Structure[]>{
        return this.list$;
    }

    addStructure(Structure){
        return this.http.post<Observable<Structure>>(this.baseUrl + '/', Structure);
    }

    getStructure(Structure){
        return this.http.get<Observable<Structure>>(this.baseUrl + '/', Structure);
    }

    deleteStructure(StructureId){
        return this.http.delete<Observable<Structure>>(this.baseUrl + '/' + StructureId);
    }
}