import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { AnswerReaction, PostAnswer, questionDetails } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AnswerService {
    private endPoint = 'answers';
    private apiUrl = environment.apiBaseUrl + this.endPoint;
    private _answersCount: Subject<number>;
    private _answerStatus: BehaviorSubject<boolean>;
    public ansStatus = false;

    constructor(private http: HttpClient) {
        this._answersCount = new Subject<number>();
        this._answerStatus = new BehaviorSubject<boolean>(false);
    }

    getAnswerStatus() {
        return this._answerStatus.asObservable();
    }

    addAnswer(answer: PostAnswer) {
        return this.http.post<void>(`${this.apiUrl}/add`, answer);
    }

    answerReaction(answerId: string, reactionType: number): Observable<AnswerReaction[]> {
        return this.http.put<AnswerReaction[]>(`${this.apiUrl}/reaction?answerId=${answerId}&reactionType=${reactionType}`, {});
    }

    markBestAnswer(answerId: string, isBestSolution: boolean) {
        return this.http.put(`${this.apiUrl}/bestsolution?answerId=${answerId}&isBestSolution=${isBestSolution}`, {});
    }

    getQuestionDetailsById(id: string): Observable<questionDetails> {
        return this.http.get<questionDetails>(`${this.apiUrl}/details/${id}`);
    }

    set answerStatus(value: boolean) {
        this.ansStatus = value;
        this._answerStatus.next(value);
    }

    set answersCount(count: number) {
        this._answersCount.next(count);
    }

    getAnsCount(): Observable<number> {
        return this._answersCount.asObservable();
    }
}
