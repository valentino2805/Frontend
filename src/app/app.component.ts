import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from './public/components/language-switcher/language-switcher.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    LanguageSwitcherComponent,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CleanView';
  @ViewChild(MatSidenav, { static: true }) sidenav!: MatSidenav;
  activeOption: string = '';
  isSidenavOpen = true;

  otherOptions = [
    { icon: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', path: '/home', title: 'homeTitle' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/3917/3917028.png', path: '/controlPanel', title: 'controlPanelTitle' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png', path: '/sustainableActions', title: 'sustainableActionsTitle' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/535/535239.png', path: '/collectionPoints', title: 'collectionPointsTitle' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/992/992700.png', path: '/reports', title: 'reportsTitle' },
  ];

  constructor(
    private translate: TranslateService,
    private observer: BreakpointObserver,
    private router: Router
  ) {
    // Configuración de traducción
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    // Configuración de la vista de Sidenav dependiendo del tamaño de la pantalla
    this.observer.observe(['(max-width: 1280px)']).subscribe((response) => {
      if (response.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.sidenav.toggle();
  }

  setActiveOption(option: string) {
    this.activeOption = option;
  }
}
