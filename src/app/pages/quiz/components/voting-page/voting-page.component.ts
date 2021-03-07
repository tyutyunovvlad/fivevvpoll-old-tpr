import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IVote, MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.scss']
})
export class VotingPageComponent implements OnInit {

  public name: string;
  public expertName: string;
  public metric: Array<string>;
  public alternatives: Array<string>;

  public marks = [];

  constructor(private mainService: MainService, private router: Router) {
    this.mainService.options$.subscribe(res => {
      this.name = res.name;
      this.expertName = this.mainService.votingName;
      this.metric = this.mainService.metrics[res.type];
      this.alternatives = res.alternatives;

      for (let i = 0; i < res.count; i++) {
        this.marks.push(2);
      }
    });
  }

  ngOnInit(): void { }

  public send(): void {
    const res: IVote = {
      name: this.expertName,
      votes: this.marks
    };
    this.mainService.addVote(res);
  }

  public back(): void {
    this.router.navigate(['quiz']);
  }
}
