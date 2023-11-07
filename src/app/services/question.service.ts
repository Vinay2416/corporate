import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Question, PostQuestion, Vote } from '../models';
import { Reportedquestions } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class QuestionService {
    private endPoint = 'questions';
    private apiUrl = environment.apiBaseUrl + this.endPoint;
    private _questionStatus: Subject<boolean>;
    private _questionsCount: BehaviorSubject<number>;

    constructor(private http: HttpClient) {
        this._questionStatus = new Subject<boolean>();
        this._questionsCount = new BehaviorSubject<number>(0);
    }

    getQuestionStatus(): Observable<boolean> {
        return this._questionStatus.asObservable();
    }

    getQuestionsCount(): Observable<number> {
        return this._questionsCount.asObservable();
    }

    set questionsCount(value: number) {
        this._questionsCount.next(value);
    }
    set questionStatus(value: boolean) {
        this._questionStatus.next(value);
    }

    reportQuestion(reportedquestiondetails: any): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/report`, reportedquestiondetails);
    }

    addQuestion(obj: PostQuestion): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/add`, obj);
    }

    getFilteredQuestions(filters: any): Observable<Question[]> {
        return this.http.post<Question[]>(`${this.apiUrl}/filter`, filters);
    }

    handleQuestionVote(voteData: Vote) {
        return this.http.put<any>(`${this.apiUrl}/togglevote?questionId=${voteData.questionId}&isVoted=${voteData.isVoted}`, {});
    }

    increaseQuestionView(id: string) {
        return this.http.put<any>(`${this.apiUrl}/views/${id}`, {});
    }

    getQuestionsAskedByUser(id: string): Observable<Question[]> {
        return this.http.get<Question[]>(`${this.apiUrl}/asked/${id}`);
    }

    getQuestionsAnsweredByUser(id: string): Observable<Question[]> {
        return this.http.get<Question[]>(`${this.apiUrl}/answered/${id}`);
    }

    getReportedQuestions(): Observable<Question[]> {
        return this.http.get<Question[]>(`${this.apiUrl}/reported`);
    }

    getReportedQuestionDetails(id: string): Observable<Reportedquestions> {
        return this.http.get<Reportedquestions>(`${this.apiUrl}/reportedquestiondetails/${id}`);
    }

    updateQuestionStatus(questionId: string, isSolved: boolean): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/status?questionId=${questionId}&isSolved=${isSolved}`, {});
    }

    getNoOfQuestions(questionQueryOptions: any) {
        return this.http.post<any>(`${this.apiUrl}/questionscount`, questionQueryOptions);
    }
}
