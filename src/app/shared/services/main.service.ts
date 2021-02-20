import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface IData {
  name: string;
  count: number;
  type: number;
  alternatives: Array<string>;
}

export interface IVote {
  name: string;
  votes: Array<string | number>;
}

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public metrics = [
    ['Дуже погано', 'Погано', 'Байдуже', 'Добре', 'Дуже добре'],
    ['Категорично проти', 'Проти', 'Байдуже', 'За', 'Категорично за'],
    ['1', '2', '3', '4', '5']
  ];

  private votesSubj = new BehaviorSubject<Array<IVote>>([]);
  public votes$ = this.votesSubj.asObservable().pipe(filter(r => !!r));

  private optionsSubj = new BehaviorSubject<IData>(null);
  public options$ = this.optionsSubj.asObservable().pipe(filter(r => !!r));

  public votingName = '';

  constructor(private router: Router) { }

  public create(data: IData): void {
    this.router.navigate(['/quiz']);
    this.optionsSubj.next(data);
    console.log(data);
  }

  public addVote(vote: IVote): void {
    this.router.navigate(['/quiz']);
    const votes = this.votesSubj.value;
    votes.push(vote);
    this.votesSubj.next(votes);
    console.log(vote, votes);
    
  }

  public startVoting(name: string): void {
    this.votingName = name.trim();
    this.router.navigate(['/quiz/voting']);
  }
}
