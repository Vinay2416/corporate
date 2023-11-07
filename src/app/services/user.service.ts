import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private endPoint = 'users';
    private apiUrl = environment.apiBaseUrl + this.endPoint;
    userData: any;
    // private _userData: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        // this._userData = new BehaviorSubject<any>(false);
    }

    getUserById(id: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${id}`);
    }

    getSearchUsers(userQueryOptions: any): Observable<User[]> {
        return this.http.post<User[]>(`${this.apiUrl}/filter`, userQueryOptions);
    }

    setUserDetails(userData:any) {
        this.userData = userData;
    }

    getUserDetails(property: string) {
        return this.userData[property];
    }
}
