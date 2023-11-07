import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Category } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private endPoint = 'categories';
    private apiUrl = environment.apiBaseUrl + this.endPoint;

    constructor(private http: HttpClient) {}

    addCategory(category: Category): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/add`, category);
    }

    getCategoryNames(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/categorynames`);
    }

    getFilteredCategories(categoryFilter: any): Observable<Category[]> {
        return this.http.post<Category[]>(`${this.apiUrl}/filter`, categoryFilter);
    }
}
