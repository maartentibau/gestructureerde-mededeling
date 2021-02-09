import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CoreModule } from './core/core.module';
import { CreateComponent } from './components/create/create.component';
import { GenerateComponent } from './components/generate/generate.component';
import { ValidateComponent } from './components/validate/validate.component';
import { NavigationComponent } from './core/components/navigation/navigation.component';
import { NumberComponent } from './core/components/number/number.component';
import { StringToArrayPipe } from './core/string-to-array.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputComponent } from './core/components/input/input.component';
import { ControlsComponent } from './core/components/controls/controls.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    GenerateComponent,
    ValidateComponent,
    NavigationComponent,
    NumberComponent,
    StringToArrayPipe,
    InputComponent,
    ControlsComponent,
    MainComponent,
  ],
  imports: [BrowserModule, CoreModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
