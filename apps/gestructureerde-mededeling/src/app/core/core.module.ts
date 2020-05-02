import { NgModule } from '@angular/core';
import { RoutingModule } from './routing.module';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [RoutingModule, MaterialModule, ReactiveFormsModule],
  exports: [RoutingModule, MaterialModule, ReactiveFormsModule],
})
export class CoreModule {}
