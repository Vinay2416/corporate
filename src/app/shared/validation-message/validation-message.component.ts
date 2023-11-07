import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-validation-message',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './validation-message.component.html',
})
export class ValidationMessageComponent {
    @Input() control: AbstractControl | null = null;
    @Input() validators: any;

    hasError(validator: any) {
        return this.control?.hasError(validator.type) && (this.control?.dirty || this.control?.touched) && (!this.control?.value?.trim() || this.control?.touched);
    }
}
