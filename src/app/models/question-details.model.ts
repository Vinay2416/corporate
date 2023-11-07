import { Answer } from './answer.model';

export interface questionDetails {
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
    answers: Answer[];
}
