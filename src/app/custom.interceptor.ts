import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, finalize } from 'rxjs';

import { SpinnerVisibilityService } from 'ng-http-loader';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
    constructor(private spinner: SpinnerVisibilityService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.spinner.show();
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        });

        request = request.clone({
            headers: headers,
        });

        return next.handle(request).pipe(
            finalize(() => {
                this.spinner.hide();
            })
        );
    }
}
