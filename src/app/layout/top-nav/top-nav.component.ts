import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from 'src/app/services';

@Component({
    selector: 'app-top-nav',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './top-nav.component.html',
})
export class TopNavComponent {
    userRole: string | undefined;

    constructor(private userService: UserService) {}
    ngOnInit() {
        this.userRole=this.userService.getUserDetails('role')
    }
}
