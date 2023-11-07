import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private _toasterStatus: BehaviorSubject<any>;

    constructor() {
        this._toasterStatus = new BehaviorSubject<any>({ message: null, type: null });
    }

    getToasterStatus(): Observable<any> {
        return this._toasterStatus.asObservable();
    }

    showToastr(type: string, message: string) {
        this._toasterStatus.next({ message: message, type: type });
    }
}
