import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { HeaderComponent, LeftNavComponent, TopNavComponent } from '../layout';

@Component({
    selector: 'app-main-page',
    standalone: true,
    imports: [CommonModule, RouterOutlet, LeftNavComponent, HeaderComponent, TopNavComponent],
    templateUrl: './main-page.component.html',
})
export class MainPageComponent {
    constructor(private routes: Router) {
        this.routes.navigate(['home']);
    }
}
