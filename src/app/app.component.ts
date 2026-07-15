import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogService } from './core/services/catalog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showSplash = true;

  constructor(
    private router: Router,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.catalogService.ensureLoaded();
  }

  onSplashComplete(): void {
    this.showSplash = false;
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
