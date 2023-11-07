import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './users.component.html',
})
export class UsersComponent {}
