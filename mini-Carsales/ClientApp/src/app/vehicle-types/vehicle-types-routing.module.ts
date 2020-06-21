import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleTypeListComponent } from './vehicle-type-list/vehicle-type-list.component';
import { VehicleTypeAddupdateComponent } from './vehicle-type-addupdate/vehicle-type-addupdate.component';

const routes: Routes = [
  { path: 'vehicletypes', component: VehicleTypeListComponent},
  { path: 'modifytype/:id', component: VehicleTypeAddupdateComponent},
  { path: 'newtype', component: VehicleTypeAddupdateComponent},

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleTypesRoutingModule { }
