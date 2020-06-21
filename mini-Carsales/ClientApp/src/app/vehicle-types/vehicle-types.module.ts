import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleTypeListComponent } from './vehicle-type-list/vehicle-type-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleTypesRoutingModule } from './vehicle-types-routing.module';
import { VehicleTypeAddupdateComponent } from './vehicle-type-addupdate/vehicle-type-addupdate.component';
import { ComponentControlModule } from '../component-control/component-control.module';



@NgModule({
  declarations: [VehicleTypeListComponent, VehicleTypeAddupdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VehicleTypesRoutingModule,
    ComponentControlModule
  ]
})
export class VehicleTypesModule { }
