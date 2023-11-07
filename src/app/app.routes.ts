import { Routes } from '@angular/router';

import { CategoriesPageComponent } from './categories';
import { HomePageComponent } from './home';
import { LogInComponent, SignUpComponent } from './auth';
import { MainPageComponent } from './main-page/main-page.component';
import { QuestionDetailsComponent, SelectQuestionComponent } from './shared';
import { UserDetailsComponent, UsersComponent, UsersPageComponent } from './users';
import { AuthGuard } from './auth.guard';
import { ReportedQuestionsComponent, ReportedQuestionDetailsComponent } from './reported/index';

export const routes: Routes = [
    {
        path: 'signup',
        component: SignUpComponent,
    },
    {
        path: 'login',
        component: LogInComponent,
    },
    {
        path: '',
        canActivate: [AuthGuard],
        component: MainPageComponent,
        children: [
            {
                path: 'home',
                component: HomePageComponent,
                children: [
                    {
                        path: '',
                        component: SelectQuestionComponent,
                    },
                    {
                        path: ':id',
                        component: QuestionDetailsComponent,
                    },
                ],
            },
            {
                path: 'categories',
                component: CategoriesPageComponent,
            },
            {
                path: 'users',
                component: UsersComponent,
                children: [
                    {
                        path: '',
                        component: UsersPageComponent,
                    },
                    {
                        path: ':id',
                        component: UserDetailsComponent,
                        children: [
                            {
                                path: ':id',
                                component: QuestionDetailsComponent,
                            },
                        ],
                    },
                ],
            },
            {
                path: 'reportedQuestions',
                component: ReportedQuestionsComponent,
                children: [
                    {
                        path: ':id',
                        component: ReportedQuestionDetailsComponent,
                    },
                ],
            },
        ],
    },
    { path: '**', redirectTo: 'login' },
];
