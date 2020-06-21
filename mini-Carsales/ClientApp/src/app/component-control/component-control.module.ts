import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentControlComponent } from './component-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ComponentControlComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [ComponentControlComponent]
})
export class ComponentControlModule { }
