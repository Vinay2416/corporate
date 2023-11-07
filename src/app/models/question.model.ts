export interface Question {
    id: string;
    username: string;
    questionTitle: string;
    description: string;
    votes: number;
    views: number;
    createdAt: string;
    isSolved: boolean;
    numberOfAnswers: number;
    profilePicture: string;
    isVoted: boolean;
}
