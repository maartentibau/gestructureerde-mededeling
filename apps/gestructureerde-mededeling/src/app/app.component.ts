import { Component } from '@angular/core';
import { FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ScreenService } from './core/services/screen.service';

@Component({
  selector: 'ogm-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private screenService: ScreenService, private faConfig: FaConfig, private faIconLibrary: FaIconLibrary) {
    this.faConfig.fixedWidth = true;
    this.faIconLibrary.addIcons(faGithub, faHeart);
  }
}
