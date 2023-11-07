import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { UserProfilePictureComponent, QuestionDetailsComponent, SelectQuestionComponent } from '../index';
import { AnswerService, QuestionService } from 'src/app/services';
import { Vote, Question } from 'src/app/models';
import { customPipe } from '../../custom.pipe';

@Component({
    selector: 'app-questions',
    standalone: true,
    imports: [CommonModule, RouterOutlet, SelectQuestionComponent, QuestionDetailsComponent, UserProfilePictureComponent, RouterLink, RouterLinkActive, FormsModule, customPipe],
    templateUrl: './questions.component.html',
})
export class QuestionsComponent {
    @Input() questions!: Question[];
    @Output() pageChange = new EventEmitter<any>();
    @ViewChild('pageScroll') pageScroll: ElementRef | undefined;
    @ViewChild('scrollItem') scrollItem: ElementRef | undefined;
    userId: string | undefined;
    haveQuestions: boolean = true;
    totalQuestions = 0;

    currentPage: number = 1;
    pageSize = 2;
    pages: number[] = [];
    totalPages: number | undefined;
    answersCount: number | undefined;
    openedQuestionId: string | undefined;
    questionsData: Question[] = [];
    isQuestionSelected = false;

    constructor(private router: Router, private questionService: QuestionService, private answerService: AnswerService) {}

    ngOnInit() {
        this.questionService.getQuestionsCount().subscribe((response) => {
            this.totalQuestions = response;
            this.handlePageNumbers();
            this.currentPage = 1;
            this.pageChange.emit({ pageSize: this.pageSize, currentPage: 1 });
        });

        this.answerService.getAnsCount().subscribe((count) => {
            const url = this.router.url.split('/');
            this.openedQuestionId = url.pop();
            this.questions = this.questions?.map((question: Question) => {
                if (question.id === this.openedQuestionId) {
                    question.numberOfAnswers = count;
                }
                return question;
            });
        });

        this.questionService.getQuestionStatus().subscribe(() => {
            const url = this.router.url.split('/');
            this.openedQuestionId = url.pop();
            this.questions = this.questions?.map((item: Question) => {
                if (item.id === this.openedQuestionId) {
                    item.isSolved = true;
                }
                return item;
            });
        });
    }

    ngOnChanges() {
        this.isQuestionSelected = false;
    }

    handlePageNumbers() {
        this.totalPages = Math.ceil(this.totalQuestions / this.pageSize);
        this.pages = [];
        for (let i = 1; i <= this.totalPages; i++) {
            this.pages?.push(i);
        }
    }

    handlePageSize(event: Event) {
        const target = event.target as HTMLInputElement;
        if (Math.floor(+target.value) >= 1) {
            this.pageSize = Math.floor(+target.value);
            const filters = { pageSize: this.pageSize, currentPage: 1 };
            this.handlePageNumbers();
            this.pageChange.emit(filters);
        } else {
            this.pageSize = 2;
            const filters = { pageSize: this.pageSize, currentPage: 1 };
            this.handlePageNumbers();
            this.pageChange.emit(filters);
        }
    }

    onVoteToggle(question: Question, event: Event) {
        event.stopPropagation();
        const updatedState = question.isVoted ? false : true;
        const vote: Vote = { questionId: question.id, isVoted: updatedState };
        this.questionService.handleQuestionVote(vote).subscribe({
            next: (response) => {
                question.votes = response.votes;
            },
        });
        question.isVoted = !question.isVoted;
    }

    previousPage(): void {
        if (this.currentPage > 1 && this.totalQuestions) {
            this.currentPage--;
            const element = this.pageScroll?.nativeElement;
            const scrollItem = this.scrollItem?.nativeElement;
            if (this.currentPage <= Math.ceil(this.totalQuestions / this.pageSize) - 4) {
                element.scrollLeft -= scrollItem.scrollWidth + 8;
            }
            const filters = { pageSize: this.pageSize, currentPage: this.currentPage };
            this.pageChange.emit(filters);
        }
    }

    nextPage(): void {
        if (this.currentPage < Math.ceil(this.totalQuestions / this.pageSize)) {
            const element = this.pageScroll?.nativeElement;
            const scrollItem = this.scrollItem?.nativeElement;
            if (this.currentPage >= 4) {
                element.scrollLeft += scrollItem.scrollWidth + 8;
            }
            this.currentPage++;
            const filters = { pageSize: this.pageSize, currentPage: this.currentPage };
            this.pageChange.emit(filters);
        }
    }

    onPageSelection(page: number): void {
        this.currentPage = page;
        const filters = { pageSize: this.pageSize, currentPage: this.currentPage };
        this.pageChange.emit(filters);
    }

    onQestionClick(question: Question) {
        this.isQuestionSelected = true;
        this.questionService.increaseQuestionView(question.id).subscribe({
            next: (response) => {
                question.views = response.views;
            },
        });
    }
}
