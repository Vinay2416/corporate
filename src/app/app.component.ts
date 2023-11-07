import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgHttpLoaderModule } from 'ng-http-loader';

import { HeaderComponent, LeftNavComponent, TopNavComponent } from './layout';
import { ToastrComponent, LoaderComponent } from './shared';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, LeftNavComponent, HeaderComponent, TopNavComponent, NgHttpLoaderModule, ToastrComponent, LoaderComponent],
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'corporate-qna';
    public LoaderComponent = LoaderComponent;
}
