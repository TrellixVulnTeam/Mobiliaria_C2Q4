import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsesorRoutingModule } from './asesor-routing.module';
import { InmueblesComponent } from './components/inmuebles/inmuebles.component';


@NgModule({
  declarations: [
    InmueblesComponent
  ],
  imports: [
    CommonModule,
    AsesorRoutingModule
  ]
})
export class AsesorModule { }
