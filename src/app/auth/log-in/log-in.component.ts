import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

import { AuthorizationService, NotificationService, UserService } from '../../services';
import { ValidationMessageComponent } from 'src/app/shared';

@Component({
    selector: 'app-log-in',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink, ValidationMessageComponent],
    templateUrl: './log-in.component.html',
})
export class LogInComponent {
    loginForm: FormGroup;
    validationMessages = {
        email: [
            { type: 'required', message: 'Email is required' },
            { type: 'email', message: 'Email is invalid' },
        ],
        password: [
            { type: 'required', message: 'Password is required' },
            { type: 'minlength', message: 'Password should be greater than 4 charactors' },
        ],
    };

    constructor(private routes: Router, public authorizationService: AuthorizationService, private notificationService: NotificationService, private userService: UserService) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(2)]),
        });
    }

    ngOnInit() {
        if (this.authorizationService.isAuthenticated()) {
            this.routes.navigate(['home']);
        }
    }

    OnInput(controlName: string) {
        if (this.loginForm.get(controlName)?.value.trim()) {
            this.loginForm.get(controlName)?.markAsUntouched();
        }
    }

    hashPassword(password: string): string {
        const hashedPassword = CryptoJS.SHA256(password).toString();
        return hashedPassword;
    }

    onLogin() {
        this.loginForm.markAllAsTouched();
        if (this.loginForm.valid) {
            const formDataWithHashedPassword = { ...this.loginForm.value, password: this.hashPassword(this.loginForm.controls['password'].value) };
            this.authorizationService.loginUser(formDataWithHashedPassword).subscribe({
                next: (response) => {
                    this.authorizationService.authenticateUser(response.token);
                    this.routes.navigate(['home']);
                    // this.userService.setUserDetails();
                    window.location.reload();
                },
                error: () => {
                    this.notificationService.showToastr('error', 'Email or password is invalid');
                },
            });
        }
    }

    setUserDetails() {}
}
