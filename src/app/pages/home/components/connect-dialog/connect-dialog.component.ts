import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-connect-dialog',
  templateUrl: './connect-dialog.component.html',
  styleUrls: ['./connect-dialog.component.scss']
})
export class ConnectDialogComponent implements OnInit {

  id: string;

  constructor(private mainService: MainService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void { }

  public connect(): void {
    this.mainService.findById(this.id);
    this.dialog.closeAll();
    this.router.navigate(['quiz']);
  }

}
