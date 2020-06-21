import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VehicleType } from 'src/app/services/data-types/common.types';

@Component({
  selector: 'app-vehicle-type-list',
  templateUrl: './vehicle-type-list.component.html'
})
export class VehicleTypeListComponent implements OnInit {
  public VehicleTypes: VehicleType[];
  constructor(private vehicleservice: VehicleService) { }

  ngOnInit(): void {
    this.vehicleservice.getvehicleType().subscribe(result=>{
      this.VehicleTypes=result
      console.log(this.VehicleTypes);
    }
      
      );

  }

}
