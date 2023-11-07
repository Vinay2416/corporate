import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DatePipe } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserProfilePictureComponent } from 'src/app/shared';
import { AuthorizationService, UserService } from 'src/app/services';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage, UserProfilePictureComponent, DatePipe, ReactiveFormsModule],
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    isPopoverOpen = false;
    modelRef?: BsModalRef;
    currentDate: Date = new Date();
    userName: string | undefined;
    imagePath = '../../assets/user-default-pic.jpg';

    constructor(private renderer: Renderer2, private el: ElementRef, private userService: UserService, private authorizationService: AuthorizationService, private router: Router) {
        if (sessionStorage.getItem('themeMode') === null) {
            sessionStorage.setItem('themeMode', 'light');
        }
        this.setTheme();
        this.setMiniTheme();
    }
    ngOnInit() {
        this.renderer.listen('window', 'click', () => {
            if (this.isPopoverOpen) {
                this.isPopoverOpen = false;
            }
        });
        this.userName=this.userService.getUserDetails('name')
        this.imagePath=this.userService.getUserDetails('profilePicture')
    }

    handleTheme() {
        const themeMode = sessionStorage.getItem('themeMode');
        sessionStorage.setItem('themeMode', themeMode === 'light' ? 'dark' : 'light');
        this.setTheme();
    }

    setTheme() {
        if (sessionStorage.getItem('themeMode') === 'dark') {
            this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'theme-dark');
        } else {
            this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'theme-dark');
        }
    }

    handlePopover(e: Event) {
        this.isPopoverOpen = !this.isPopoverOpen;
        e.stopPropagation();
    }

    handleMiniTheme(colorCode: string) {
        sessionStorage.setItem('themeColor', colorCode);
        this.setMiniTheme();
    }

    setMiniTheme() {
        const root = document.documentElement;
        const colorCode = sessionStorage.getItem('themeColor');
        root.style.setProperty('--primary-color', colorCode);
    }

    onLogout() {
        this.authorizationService.logoutUser()
        this.router.navigate(['login']);
    }
}
