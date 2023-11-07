import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-profile-picture',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-profile-picture.component.html',
})
export class UserProfilePictureComponent {
    @Input() imagePath = '../../assets/user-default-pic.jpg';
}
