import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ValidationMessageComponent } from 'src/app/shared';
import { CategoryService } from 'src/app/services';

@Component({
    selector: 'app-new-category',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ValidationMessageComponent],
    templateUrl: './new-category.component.html',
})
export class NewCategoryComponent {
    @Input() modalRef: BsModalRef | undefined;
    @Output() categoryCreated = new EventEmitter<void>();

    categoryName!: string;
    description!: string;
    categoryForm: FormGroup;
    validationMessages = {
        name: [
            { type: 'required', message: 'Category name is required' }
        ],
    };

    constructor(private categoryService: CategoryService) {
        this.categoryForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            description: new FormControl(''),
        });
    }

    onFormSubmission(e: Event) {
        this.categoryForm.markAllAsTouched();
        if (this.categoryForm.valid) {
            this.categoryService.addCategory(this.categoryForm.value).subscribe({
                next: () => {
                    this.categoryCreated.emit();
                    this.modalRef?.hide();
                }
            });
        }
    }

    onModalClose() {
        this.modalRef?.hide();
    }
}
