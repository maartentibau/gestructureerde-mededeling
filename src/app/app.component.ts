import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { NavigationComponent } from './core/components/navigation/navigation.component';

@Component({
  standalone: true,
  imports: [NavigationComponent, MatCardModule, FontAwesomeModule, NgStyle, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  #faConfig: FaConfig = inject(FaConfig);
  #faIconLibrary: FaIconLibrary = inject(FaIconLibrary);

  constructor() {
    this.#faConfig.fixedWidth = true;
    this.#faIconLibrary.addIcons(faGithub, faHeart);
  }
}
