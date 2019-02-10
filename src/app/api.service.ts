import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) {
    }

    get(path: string, params: HttpParams = null, responseType = null): Observable<any> {
        return this.http.get(`${path}`, {params: params, responseType: responseType ? responseType : 'json'});
    }

}