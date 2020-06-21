import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

import { VehicleAddUpdateComponent } from './vehicle-add-update/vehicle-add-update.component';

const routes: Routes = [
  { path: '', component: VehicleListComponent},
  { path: 'createnew', component: VehicleAddUpdateComponent},
  { path: 'modify/:id', component: VehicleAddUpdateComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
