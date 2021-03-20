import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MainService } from 'src/app/shared/services/main.service';
import { ConnectDialogComponent } from './components/connect-dialog/connect-dialog.component';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  disabled = false;

  constructor(public dialog: MatDialog, private mainService: MainService) {
    this.mainService.admin$.subscribe(admin => {
      // this.disabled = !admin;
    }) ;
  }

  ngOnInit(): void {
    this.mainService.clearAll();
  }

  public create(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent);
  }

  public connect(): void {
    const dialogRef = this.dialog.open(ConnectDialogComponent);
  }
}
