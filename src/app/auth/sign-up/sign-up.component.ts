import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

import { AuthorizationService, NotificationService } from '../../services';
import { ValidationMessageComponent } from 'src/app/shared';

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ValidationMessageComponent],
    templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
    
    imgUrl = '../../assets/user-default-pic.jpg';
    signUpForm: FormGroup;

    validationMessages = {
        name: [
            { type: 'required', message: 'Name is required' }
        ],
        jobTitle: [
            { type: 'required', message: 'Job title is required' }
          ],
        department: [
            { type: 'required', message: 'Department is required' }
          ],
        location: [
            { type: 'required', message: 'Location is required' }
          ],
        email: [
            { type: 'required', message: 'Email is required' },
            { type: 'email', message: 'Email is invalid' }
          ],
        password: [
            { type: 'required', message: 'Password is required' },            
            { type: 'minlength', message: 'Password should have more than 4 charactors' },            
          ],
    };

    constructor(private router: Router, private authorizationService: AuthorizationService,private notificationService: NotificationService) {
        this.signUpForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            jobTitle: new FormControl('', [Validators.required]),
            department: new FormControl('', [Validators.required]),
            location: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required,Validators.minLength(4)]),
            profilePicture: new FormControl(this.imgUrl),
        });
    }

    OnInput(controlName: string) {
        if (this.signUpForm.get(controlName)?.value.trim()) {
            this.signUpForm.get(controlName)?.markAsUntouched();
        }
    }

    onLoginClick() {
        this.router.navigate(['login']);
    }

    onImageChange(event: Event) {
        const element = event.target as HTMLInputElement;
        const files = element.files![0];
        if (files) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                this.imgUrl = event.target.result;
                this.signUpForm.patchValue({ profilePicture: event.target.result });
            };
            reader.readAsDataURL(files);
        }
    }
    
    hashPassword(password: string): string {
        const hashedPassword = CryptoJS.SHA256(password).toString();
        return hashedPassword;
    }

    onSignup() {
        this.signUpForm.markAllAsTouched();
        if (this.signUpForm.valid) {
            const formDataWithHashedPassword = { ...this.signUpForm.value, password: this.hashPassword(this.signUpForm.get('password')?.value) };
            this.authorizationService.signUpUser(formDataWithHashedPassword).subscribe({
                next: () => {
                    this.router.navigate(['login']);
                },
                error: (error) => {
                    if (error.status === 409) {
                        this.notificationService.showToastr('error', 'Email is already registered');
                    }
                },
            });
        }
    }
}
