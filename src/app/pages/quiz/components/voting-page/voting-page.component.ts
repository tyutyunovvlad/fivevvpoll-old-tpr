import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/services/error.service';
import { IVote, IData, MainService } from 'src/app/shared/services/main.service';
import { RouterErrorComponent } from '../../../../shared/errors/router-error/router-error.component';

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

  constructor(
    private mainService: MainService,
    private router: Router,
    private errorService: ErrorService
  ) {
    this.mainService.options$.subscribe(res => {
      if (res !== 'empty') {
        this.name = res.name;
        this.expertName = this.mainService.votingName;
        this.metric = this.mainService.metrics[res.type].values;
        this.alternatives = res.alternatives;

        for (let i = 0; i < res.count; i++) {
          this.marks.push(2);
        }
      } else {
        this.errorService.showRouteError();

        this.router.navigate(['home']);
        
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (!this.name) {
        this.errorService.showRouteError();
        this.router.navigate(['home']);
      }
    }, 300);
  }


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
