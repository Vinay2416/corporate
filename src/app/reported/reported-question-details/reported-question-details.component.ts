import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { User, Reportedquestions } from '../../models';
import { QuestionService } from '../../services';
import { customPipe } from '../../custom.pipe';
import { QuestionsComponent, UserProfilePictureComponent } from '../../shared';

@Component({
    selector: 'app-reported-question-details',
    standalone: true,
    imports: [CommonModule, UserProfilePictureComponent, customPipe, QuestionsComponent],
    templateUrl: './reported-question-details.component.html',
})
export class ReportedQuestionDetailsComponent {
    reportedUsers: User[] = [];
    questionDetails: Reportedquestions | undefined;
    constructor(private questionService: QuestionService, private routes: ActivatedRoute) {}
    ngOnInit() {
        this.routes.params.subscribe((id) => {
            this.questionService.getReportedQuestionDetails(id['id']).subscribe({
                next: (response: Reportedquestions) => {
                    this.questionDetails = response;
                    this.reportedUsers = response.users;
                },
            });
        });
    }
}
