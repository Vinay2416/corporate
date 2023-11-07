import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Question } from '../../models';
import { QuestionService } from '../../services';
import { QuestionsComponent } from '../../shared';

@Component({
    selector: 'app-reported-questions',
    standalone: true,
    imports: [CommonModule, QuestionsComponent],
    templateUrl: './reported-questions.component.html',
})
export class ReportedQuestionsComponent {
    questions: Question[] = [];
    constructor(private questionService: QuestionService) {}

    ngOnInit() {
        this.questionService.getReportedQuestions().subscribe({
            next: (response: Question[]) => {
                this.questions = response;
            },
        });
        this.questionService.questionsCount = 0;
    }
}
