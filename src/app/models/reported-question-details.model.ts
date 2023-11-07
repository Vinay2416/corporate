import { User } from './user.model';

export interface Reportedquestions {
    id: string;
    username: string;
    userId: string;
    questionTitle: string;
    description: string;
    views: number;
    createdAt: string;
    isSolved: boolean;
    isReported: boolean;
    numberOfAnswers: number;
    profilePicture: string;
    users: User[];
}
