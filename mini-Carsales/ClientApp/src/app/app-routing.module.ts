import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./vehicles/vehicles.module').then(mod => mod.VehiclesModule)
  },

  {
    path: 'vehicletypes',
    loadChildren: () => import('./vehicle-types/vehicle-types.module').then(mod => mod.VehicleTypesModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
