import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './shared/services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tpr';

  constructor(private mainService: MainService, private router: Router) {

  }

  ngOnInit(): void {
    let id = localStorage.getItem('id');
    if (id) {
      this.mainService.findById(id);
    }
  }
  
}
