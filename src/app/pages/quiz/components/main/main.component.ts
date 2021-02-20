import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IVote, MainService } from 'src/app/shared/services/main.service';
import { NewExpertComponent } from '../new-expert/new-expert.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public name: string;
  public votes: Array<IVote>;
  public alternatives: Array<string>;

  constructor(private dialog: MatDialog, private mainService: MainService) {
    this.mainService.options$.subscribe(res => {
      this.name = res.name;
      this.alternatives = res.alternatives;
    });
    this.mainService.votes$.subscribe(res => {
      this.votes = res;
    });
  }

  ngOnInit(): void {
  }

  public newExpert(): void {
    this.dialog.open(NewExpertComponent);
  }

}
