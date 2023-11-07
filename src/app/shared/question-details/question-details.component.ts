import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AnswerService, QuestionService, UserService } from 'src/app/services';
import { PostAnswer, questionDetails, Answer, AnswerReaction } from 'src/app/models';
import { UserProfilePictureComponent } from '../index';
import { customPipe } from '../../custom.pipe';
import { TextEditorComponent } from '../text-editor/text-editor.component';

@Component({
    selector: 'app-question-details',
    standalone: true,
    imports: [CommonModule, UserProfilePictureComponent, FormsModule, TextEditorComponent, customPipe],
    templateUrl: './question-details.component.html',
})
export class QuestionDetailsComponent {
    @Input() questionDetailsData: questionDetails | undefined;
    questionDetails: questionDetails | undefined;
    nOfAns: number | undefined;
    isMinimized = true;
    editorContent: string = '';
    answers: Answer[] = [];
    isLiked = false;
    isDisliked = false;
    loggedInId = '';
    isSolved: boolean | undefined;
    editorStatus = false;

    constructor(private routes: ActivatedRoute, private questionService: QuestionService, private answerService: AnswerService, private userService: UserService) {}

    ngOnInit() {
        this.loggedInId = this.userService.getUserDetails('userId');
        this.routes.params.subscribe((id) => {
            this.isMinimized = true;
            this.answerService.getQuestionDetailsById(id['id']).subscribe({
                next: (response: questionDetails) => {
                    this.nOfAns = response.answers.length;
                    this.questionDetails = response;
                    if (this.nOfAns) {
                        this.answerService.answersCount = this.nOfAns;
                    }
                    this.answers = response.answers;
                },
            });
        });
    }

    reportQuestion(questionDetails: questionDetails) {
        const reportedquestiondetails = {
            questionId: questionDetails.id,
            reportedToUserId: questionDetails.userId,
        };
        if (!questionDetails.isReported) {
            this.questionService.reportQuestion(reportedquestiondetails).subscribe({
                next: () => {
                    questionDetails.isReported = true;
                },
            });
        }
    }

    handleAnswerInteraction(ans: Answer, updatedState: number) {
        this.answerService.answerReaction(ans.id, updatedState).subscribe({
            next: (response: AnswerReaction[]) => {
                const reactionsCount: any = { 1: 0, 2: 0 };
                response.forEach((item: AnswerReaction) => {
                    if (reactionsCount[item.reactionType] !== undefined) {
                        reactionsCount[item.reactionType] += 1;
                    }
                });
                ans.likes = reactionsCount[1];
                ans.disLikes = reactionsCount[2];
                ans.reactionType = updatedState;
            },
        });
    }

    markAsSolved(questionDetails: questionDetails) {
        this.questionService.updateQuestionStatus(questionDetails.id, !questionDetails.isSolved).subscribe({
            next: () => {
                this.questionService.questionStatus = true;
                questionDetails.isSolved = true;
            },
        });
    }

    onEditorExpansion() {
        this.isMinimized = !this.isMinimized;
    }

    onEditorContentChange(content: string) {
        this.editorContent = content;
    }

    handleBestSolution(ans: Answer) {
        this.answerService.markBestAnswer(ans.id, !ans.isBestSolution).subscribe({
            next: () => {
                ans.isBestSolution = !ans.isBestSolution;
            },
        });
    }

    onSubmitAnswer() {
        if (this.editorContent.trim() && this.loggedInId && this.questionDetails) {
            const answer: PostAnswer = {
                answerDescription: this.editorContent,
                questionId: this.questionDetails.id,
                answeredBy: this.loggedInId,
            };
            this.answerService.addAnswer(answer).subscribe({
                next: () => {
                    this.ngOnInit();
                    this.answerService.answerStatus = !this.answerService.ansStatus;
                },
            });
        }
    }
}
