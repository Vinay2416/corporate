import { Component, TemplateRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FiltersComponent, QuestionsComponent } from 'src/app/shared';
import { CategoryService, QuestionService } from 'src/app/services';
import { Question } from 'src/app/models';
import { AddQuestionComponent } from '../index';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [CommonModule, QuestionsComponent, FiltersComponent, AddQuestionComponent, FormsModule, ReactiveFormsModule],
    templateUrl: './home-page.component.html',
})
export class HomePageComponent {
    questionsList: Question[] = [];
    questionQueryOptions: any;
    questonFilter: any;
    filterForm: FormGroup;
    modalRef?: BsModalRef;

    pagingOptions: {
        pageIndex: number;
        pageSize: number;
    } = {
        pageIndex: 1,
        pageSize: 2,
    };

    controls = {
        searchValue: {
            label: 'Keywords',
            type: 'input',
        },
        categoryId: {
            label: 'Category',
            type: 'select',
            options: [{ id: '', name: 'All' }],
        },
        show: {
            label: 'Show',
            type: 'select',
            options: [
                { id: 0, name: 'All' },
                { id: 1, name: 'My Questions' },
                { id: 2, name: 'My Participation' },
                { id: 3, name: 'Solved' },
                { id: 4, name: 'Unsolved' },
            ],
        },
        dateRange: {
            label: 'Sort by',
            type: 'select',
            options: [
                { id: { start: '01-01-1970', end: this.getDate(0) }, name: 'All' },
                { id: { start: this.getDate(2), end: this.getDate(0) }, name: 'Recent' },
                { id: { start: this.getDate(10), end: this.getDate(0) }, name: 'Last 10 Days' },
                { id: { start: this.getDate(30), end: this.getDate(0) }, name: 'Last 30 Days' },
            ],
        },
    };

    constructor(private router: Router, private questionService: QuestionService, private datePipe: DatePipe, private categoryService: CategoryService, private modelService: BsModalService) {
        this.filterForm = new FormGroup({
            searchValue: new FormControl(''),
            categoryId: new FormControl([this.controls.categoryId.options[0].id]),
            show: new FormControl(this.controls.show.options[0].id),
            dateRange: new FormControl(this.controls.dateRange.options[0].id),
        });
    }

    ngOnInit() {
        this.categoryService.getCategoryNames().subscribe({
            next: (response) => {
                let updatedCategories = response.map((category: any) => category.id);
                this.controls.categoryId.options = [{ id: updatedCategories.join(',') as string, name: 'All' }, ...response];
                this.filterForm.patchValue({
                    categoryId: this.controls.categoryId.options[0].id,
                });
                this.loadQuestions(this.filterForm.value);
            },
        });
    }

    onResetClick() {
        this.filterForm.patchValue({
            searchValue: '',
            categoryId: this.controls.categoryId.options[0].id,
            show: this.controls.show.options[0].id,
            dateRange: this.controls.dateRange.options[0].id,
        });
        this.loadQuestions(this.filterForm.value);
    }

    onModalOpen(templateRef: TemplateRef<any>) {
        this.modalRef = this.modelService.show(templateRef, { class: 'modal-lg' });
    }

    getDate(days: number): string {
        const currentDate = new Date();
        const tenDaysAgo = new Date(currentDate.getTime() - days * 24 * 60 * 60 * 1000);
        return this.datePipe.transform(tenDaysAgo, 'MM-dd-yyyy') || '';
    }

    loadQuestions(event: any) {
        const queryOptions = {
            searchKeyword: event.searchValue,
            filters: {
                categoryId: event.categoryId,
            },
            dateRange: event.dateRange,
        };
        this.questonFilter = event.show;
        this.questionQueryOptions = { queryOptions: { ...queryOptions, pagingOptions: this.pagingOptions }, questionFilter: this.questonFilter };

        this.getQuestionsCount();
    }

    getQuestionsCount() {
        this.questionService.getNoOfQuestions(this.questionQueryOptions).subscribe({
            next: (response) => {
                this.questionService.questionsCount = response.numberOfQuestions;
            },
        });
    }

    getQuestions() {
        this.questionService.getFilteredQuestions(this.questionQueryOptions).subscribe({
            next: (questions: Question[]) => {
                this.questionsList = questions;
                this.router.navigate(['./home']);
            },
        });
    }

    onPageChange(event: any) {
        if (this.questionQueryOptions && this.pagingOptions) {
            this.questionQueryOptions.queryOptions.pagingOptions.pageSize = event.pageSize;
            this.questionQueryOptions.queryOptions.pagingOptions.pageIndex = event.currentPage;
            this.getQuestions();
        }
    }
}
