import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectDialogComponent } from './components/connect-dialog/connect-dialog.component';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public create(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent);
  }

  public connect(): void {
    const dialogRef = this.dialog.open(ConnectDialogComponent);
  }
}
