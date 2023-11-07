import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-left-nav',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    templateUrl: './left-nav.component.html',
})
export class LeftNavComponent {}
