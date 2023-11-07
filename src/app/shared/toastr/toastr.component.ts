import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationService } from 'src/app/services';

@Component({
    selector: 'app-toastr',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './toastr.component.html',
})
export class ToastrComponent {
    toasterStatus = false;
    toastType = 'error';
    toastTypeName = 'error';
    message = '';
    constructor(private toastrService: NotificationService) {}
    ngOnInit() {
        this.toastrService.getToasterStatus().subscribe((toasterDetails) => {
            if (toasterDetails.type !== null) {
                this.toastType = toasterDetails.type;
                this.toastTypeName = this.formatTypeName(toasterDetails.type);
                this.message = toasterDetails.message;
                this.toasterStatus = true;
                window.setTimeout(() => {
                    this.toasterStatus = false;
                }, 4000);
            }
        });
    }
    formatTypeName(type: string): string {
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
    onCancel() {
        this.toasterStatus = false;
    }
}
