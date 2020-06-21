import { Component, OnInit, Input } from '@angular/core';

import { VehicleView } from 'src/app/services/data-types/common.types';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html'
})
export class VehicleDetailsComponent implements OnInit {

  @Input() vehicleDetail:VehicleView; 


  ngOnInit() {

    console.log(this.vehicleDetail.vehicleDetail);


}
}
