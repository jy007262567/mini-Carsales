import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { VehicleAddUpdateComponent } from './vehicle-add-update/vehicle-add-update.component';

import { VehicleTypesRoutingModule } from '../vehicle-types/vehicle-types-routing.module';
import { ComponentControlModule } from '../component-control/component-control.module';


@NgModule({
  declarations: [
    VehicleDetailsComponent,
    VehicleListComponent,
    VehicleAddUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VehiclesRoutingModule,
    VehicleTypesRoutingModule,
    ComponentControlModule,
    DataTablesModule
  ],
})
export class VehiclesModule { }
