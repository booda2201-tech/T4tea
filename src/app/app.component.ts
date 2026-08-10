import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from './core/services/app-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showSplash = true;

  constructor(
    private router: Router,
    private appData: AppDataService
  ) {}

  ngOnInit(): void {
    this.appData.init();
  }

  onSplashComplete(): void {
    this.showSplash = false;
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
