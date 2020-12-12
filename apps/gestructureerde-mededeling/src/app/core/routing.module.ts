import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from '../components/create/create.component';
import { GenerateComponent } from '../components/generate/generate.component';
import { ValidateComponent } from '../components/validate/validate.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'generate', component: GenerateComponent },
  { path: 'validate', component: ValidateComponent },
  { path: '', redirectTo: '/generate', pathMatch: 'full' },
  { path: '**', component: GenerateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class RoutingModule {}
