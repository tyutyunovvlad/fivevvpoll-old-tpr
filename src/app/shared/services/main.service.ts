import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

export interface IData {
  name: string;
  id: string;
  count: number;
  type: number;
  alternatives: Array<string>;
  votes?: Array<IVote>;
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

  private ref = this.firestore.collection('interviews');

  constructor(private router: Router, private firestore: AngularFirestore) {
    this.ref.valueChanges().subscribe(res => {
    });

    this.votes$.subscribe(res => {
      if (res.length && this.optionsSubj.value) {

        this.ref.doc(this.optionsSubj.value?.id).update({ votes: res });
      }
    });
  }

  public create(data: IData): void {
    this.router.navigate(['/quiz']);
    this.optionsSubj.next(data);
    this.ref.doc(data.id).set(data);

    localStorage.setItem('id', data.id);
    this.findById(data.id);
  }

  public addVote(vote: IVote): void {
    this.router.navigate(['/quiz']);
    const votes = this.votesSubj.value;
    votes.push(vote);
    this.votesSubj.next(votes);
    this.ref.doc(this.optionsSubj.value.id).update({
      votes
    });
  }

  public startVoting(name: string): void {
    this.votingName = name.trim();
    this.router.navigate(['/quiz/voting']);
  }

  public findById(id: string): void {

    this.ref.get().subscribe(res => {

      let data: any = res.docs.map(doc => doc.data());
      let coll = data.find(el => el.id === id);
      if (coll) {
        this.votesSubj.next(coll.votes);
        this.optionsSubj.next(coll);
      }
    });
  }


  public clearAll(): void {
    this.votesSubj.next([]);
    this.optionsSubj.next(null);
    localStorage.removeItem('id');
  }
}
