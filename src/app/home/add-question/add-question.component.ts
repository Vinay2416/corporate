import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';

import { QuestionService, UserService } from 'src/app/services';
import { ValidationMessageComponent } from 'src/app/shared';
import { PostQuestion } from 'src/app/models';
import { TextEditorComponent } from 'src/app/shared/text-editor/text-editor.component';

@Component({
    selector: 'app-add-question',
    standalone: true,
    imports: [CommonModule, FormsModule, NgSelectModule, ReactiveFormsModule, TextEditorComponent, ValidationMessageComponent],
    templateUrl: './add-question.component.html',
})
export class AddQuestionComponent {
    @Input() categories: any;
    @Input() modalRef?: BsModalRef;
    @Output() questionAdded = new EventEmitter<void>();
    questionForm: FormGroup;
    categoriesList: any;
    questionTitle = '';
    loggedInId='';
    validationMessages = {
        name: [{ type: 'required', message: 'Question is required' }],
        category: [
            {
                type: 'required',
                message: 'Choose a category',
            },
        ],
    };

    constructor(private questionService: QuestionService, private userService: UserService) {
        this.questionForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            description: new FormControl(''),
            category: new FormControl(null, [Validators.required]),
        });
    }

    ngOnInit() {
        if (this.categories[0].name === 'All') {
            this.categories.shift();
        }
        this.loggedInId=this.userService.getUserDetails('userId')
    }

    onModalClose() {
        this.modalRef?.hide();
    }

    onEditorContentChange(content: string) {
        this.questionForm.get('description')?.setValue(content);
    }

    onFormSubmission() {
        this.questionForm.markAllAsTouched();
        if (this.questionForm.valid) {
            const questionData: PostQuestion = {
                questionTitle: this.questionForm.get('name')?.value,
                description: this.questionForm.get('description')?.value,
                categoryId: this.questionForm.get('category')?.value,
                raisedBy: this.loggedInId,
            };
            this.questionService.addQuestion(questionData).subscribe({
                next: () => {
                    this.questionAdded.emit();
                    this.modalRef?.hide();
                },
            });
        }
    }
}
