import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Category } from 'src/app/models';

@Component({
    selector: 'app-categories-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './categories-card.component.html',
})
export class CategoriesCardComponent {
    @Input() category: Category | undefined;
    modalRef: BsModalRef | undefined;
    categoryName: string | undefined;
    categoryDescription: string | undefined;

    constructor(private bsmodel: BsModalService) {}

    onModalExpand(template: TemplateRef<any>) {
        this.modalRef = this.bsmodel.show(template, { class: 'modal-ms' });
        this.categoryName = this.category?.name;
        this.categoryDescription = this.category?.description;
    }

    onModalClose() {
        this.modalRef?.hide();
    }
}
