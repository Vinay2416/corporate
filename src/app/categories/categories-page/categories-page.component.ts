import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { NewCategoryComponent } from '../new-category/new-category.component';
import { CategoriesCardComponent } from '../index';
import { CategoryService } from 'src/app/services';
import { Category } from 'src/app/models';
import { FiltersComponent } from 'src/app/shared';

@Component({
    selector: 'app-categories-page',
    standalone: true,
    imports: [CommonModule, NgSelectModule, FormsModule, CategoriesCardComponent, NewCategoryComponent, ReactiveFormsModule,FiltersComponent],
    templateUrl: './categories-page.component.html',
})
export class CategoriesPageComponent {
    categories: Category[] = [];
    categoryQueryOptions: any;
    categoryFilter:any;
    modalRef?: BsModalRef;
    categoriesFilterForm: FormGroup;
    controls = {
        searchValue: {
            label: 'Category',
            type: 'input',
        },
        show: {
            label: 'Show',
            type: 'select',
            options: [
                { id: 0, name: 'All' },
                { id: 1, name: 'Popular' },
                
            ],
        }
    };

    constructor(private modalService: BsModalService, private categoryService: CategoryService) {
        this.categoriesFilterForm = new FormGroup({
            searchValue: new FormControl(''),
            show: new FormControl(this.controls.show.options[0].id),
        });
    }

    ngOnInit() {
       this.loadCategories(this.categoriesFilterForm.value)
    }

    getFilteredCategories() {
        if(this.categoryQueryOptions){
            this.categoryService.getFilteredCategories(this.categoryQueryOptions).subscribe({
                next: (response: Category[]) => {
                    this.categories = response;
                },
            });
        }
    }

    onShowModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    }

    loadCategories(event: any) {
        const queryOptions = {
            searchKeyword: event.searchValue
        };
        this.categoryFilter = event.show;
        this.categoryQueryOptions = { queryOptions: { ...queryOptions }, categoryFilter: this.categoryFilter };
       
        this.getFilteredCategories();
    }

    onResetClick() {
        this.categoriesFilterForm.patchValue({
            searchValue: '',
            show: this.controls.show.options[0].id,
        });
        this.loadCategories(this.categoriesFilterForm.value)
    }
}

