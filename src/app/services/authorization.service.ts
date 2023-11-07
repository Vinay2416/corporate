import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {
    private endPoint = 'authentication';
    private apiUrl = environment.apiBaseUrl + this.endPoint;

    constructor(private http: HttpClient) {}

    isAuthenticated(): boolean {
        return localStorage.getItem('token') ? true : false;
    }

    authenticateUser(token: string) {
        localStorage.setItem('token', token);
    }

    signUpUser(signupForm: FormGroup) {
        return this.http.post(`${this.apiUrl}/register`, signupForm);
    }

    logoutUser() {
        localStorage.removeItem('token');
    }

    loginUser(loginForm: FormGroup): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, loginForm);
    }
}
