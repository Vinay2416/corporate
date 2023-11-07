import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionService } from 'src/app/services';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
    selector: 'app-filters',
    standalone: true,
    imports: [CommonModule, NgSelectModule, FormsModule, ReactiveFormsModule],
    templateUrl: './filters.component.html',
})
export class FiltersComponent {
    @Output() search = new EventEmitter<Object>();
    @Input() controls: any;
    @Input() formGroup!: FormGroup;
    formControls: any;

    ngOnInit() {
        this.formControls = Object.keys(this.controls);
    }

    compareOptions(): boolean {
        return true;
    }

    onFilterOptionChange() {
        this.search.emit(this.formGroup.value);
    }
}
