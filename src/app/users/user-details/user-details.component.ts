import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { QuestionsComponent, UserProfilePictureComponent } from 'src/app/shared';
import { QuestionService, UserService } from 'src/app/services';
import { Question, User } from 'src/app/models';

@Component({
    selector: 'app-user-details',
    standalone: true,
    imports: [CommonModule, UserProfilePictureComponent, RouterOutlet, QuestionsComponent, RouterLink, RouterLinkActive],
    templateUrl: './user-details.component.html',
})
export class UserDetailsComponent {
    userId = '';
    userData: User | undefined;
    questionsList: Question[] = [];
    askedQuestionSelected = false;

    constructor(private routes: ActivatedRoute, private userService: UserService, private questionService: QuestionService, private router: Router) {}

    ngOnInit() {
        this.routes.params.subscribe((params) => {
            this.userService.getUserById(params['id']).subscribe({
                next: (response: User) => {
                    this.userId = params['id'];
                    this.userData = response;
                    this.getAskedQuestions();
                },
            });
        });
        this.questionService.questionsCount = 0;
    }
    getAskedQuestions() {
        this.askedQuestionSelected = true;
        this.questionService.getQuestionsAskedByUser(this.userId).subscribe({
            next: (response: Question[]) => {
                this.questionsList = response;
                this.router.navigate(['/users', this.userId]);
            },
        });
    }

    getAnsweredQuestions() {
        this.askedQuestionSelected = false;
        this.questionService.getQuestionsAnsweredByUser(this.userId).subscribe({
            next: (response: Question[]) => {
                this.questionsList = response;
                this.router.navigate(['/users', this.userId]);
            },
        });
    }
}
