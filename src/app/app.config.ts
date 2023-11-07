import { ApplicationConfig, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule, HttpContext, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';
import { BsModalService } from 'ngx-bootstrap/modal';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { catchError, Observable, of, tap } from 'rxjs';

import { customPipe } from './custom.pipe';
import { CustomInterceptor } from './custom.interceptor';
import { UserService } from './services';
import { environment } from 'src/environments/environment';

export function initializeApp(http: HttpClient, userService: UserService) {
    return (): Observable<any> => {
        const token = localStorage.getItem('token');
        if (token) {
            return http.get(`${environment.apiBaseUrl}users/userDetails`).pipe(
                tap((response) => {
                    userService.setUserDetails(response);
                }),
                catchError(() => {
                    localStorage.removeItem('token');
                    return of(null);
                })
            );
        }
        return of(null);
    };
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        UserService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            multi: true,
            deps: [HttpClient, UserService],
        },
        customPipe,
        HttpContext,
        importProvidersFrom(BrowserModule, ReactiveFormsModule, HttpClientModule, DatePipe, NgxSpinnerModule, BrowserAnimationsModule),
        BsModalService,
        DatePipe,
        { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
    ],
};
