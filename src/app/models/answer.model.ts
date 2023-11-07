export interface Answer {
    id: string;
    answeredBy: string;
    profilePicture: string;
    answerDescription: string;
    answeredAt: string;
    likes: number;
    disLikes: number;
    isBestSolution: boolean;
    reactionType: number;
}
