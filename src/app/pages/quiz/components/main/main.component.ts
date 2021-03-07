import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/services/error.service';
import { IVote, MainService } from 'src/app/shared/services/main.service';
import { NewExpertComponent } from '../new-expert/new-expert.component';
import { RouterErrorComponent } from '../router-error/router-error.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public name: string;
  public votes: Array<IVote>;
  public alternatives: Array<string>;

  constructor(
    private dialog: MatDialog,
    private mainService: MainService,
    private errorService: ErrorService,
    private router: Router,
  ) {


    this.mainService.options$.subscribe(res => {

      if (res !== 'empty') {
        this.name = res.name;
        this.alternatives = res.alternatives;
      } else {
        this.errorService.showRouteError();
        this.router.navigate(['home']);
      }
    });
    this.mainService.votes$.subscribe(res => {
      this.votes = res;
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

  public newExpert(): void {
    this.dialog.open(NewExpertComponent);
  }

}
