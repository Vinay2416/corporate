import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfilePictureComponent } from 'src/app/shared';
import { User } from 'src/app/models';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [CommonModule, UserProfilePictureComponent],
    templateUrl: './user.component.html',
})
export class UserComponent {
    @Input() user: User | undefined;
}
