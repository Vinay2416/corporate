import { Component, EventEmitter, Input, Output, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { AnswerService } from 'src/app/services';

@Component({
    selector: 'app-text-editor',
    standalone: true,
    imports: [CommonModule, QuillModule, FormsModule],
    templateUrl: './text-editor.component.html',
})
export class TextEditorComponent {
    @Input() controlName: string | undefined;
    @Output() onContentChange = new EventEmitter<string>();

    editorContent: string = '';
    quillConfiguration = {
        toolbar: [[{ header: [1, 2, 3, 4, 5, 6, false] }], ['bold', 'italic', 'underline', 'strike'], [{ list: 'ordered' }, { list: 'bullet' }], ['blockquote', 'link']],
    };
    constructor(private answerService: AnswerService, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.answerService.getAnswerStatus().subscribe(() => {
            this.editorContent = '';
        });
    }

    onInputChange() {
        const sanitizedContent = this.sanitizer.sanitize(SecurityContext.HTML, this.editorContent.trim());
        this.onContentChange.emit(sanitizedContent || '');
    }
}
