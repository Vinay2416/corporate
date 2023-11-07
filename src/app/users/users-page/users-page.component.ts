import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { UserProfilePictureComponent, FiltersComponent } from 'src/app/shared';
import { UserComponent, UserDetailsComponent } from '../index';
import { UserService } from 'src/app/services';
import { User } from 'src/app/models';

@Component({
    selector: 'app-users-page',
    standalone: true,
    imports: [CommonModule, UserProfilePictureComponent, UserDetailsComponent, RouterLink, UserComponent, FiltersComponent],
    templateUrl: './users-page.component.html',
})
export class UsersPageComponent {
    public users: User[] | undefined;
    userfilterForm: FormGroup;
    userQueryOptions: any;

    controls = {
        searchValue: {
            label: 'Users',
            type: 'input',
        },
    };

    constructor(private router: Router, private userService: UserService) {
        this.userfilterForm = new FormGroup({
            searchValue: new FormControl(''),
        });
    }

    ngOnInit() {
        this.loadUsers(this.userfilterForm.value);
    }

    onCardClick(id: string) {
        this.router.navigate(['users', id]);
    }

    getSearchedUsers() {
        if (this.userQueryOptions) {
            this.userService.getSearchUsers(this.userQueryOptions).subscribe({
                next: (response: User[]) => {
                    this.users = response;
                },
            });
        }
    }

    loadUsers(event: any) {
        const queryOptions = {
            searchKeyword: event.searchValue,
        };
        this.userQueryOptions = { ...queryOptions };
        this.getSearchedUsers();
    }
}
