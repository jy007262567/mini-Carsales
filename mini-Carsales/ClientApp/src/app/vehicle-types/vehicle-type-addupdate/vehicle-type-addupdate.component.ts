import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseControl } from 'src/app/services/data-types/basecontrol';
import { Observable, of } from 'rxjs';
import { Textbox } from 'src/app/services/data-types/textbox';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VehicleProperty } from 'src/app/services/data-types/common.types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-type-addupdate',
  templateUrl: './vehicle-type-addupdate.component.html'
})
export class VehicleTypeAddupdateComponent implements OnInit {
  form: FormGroup;
  controls: BaseControl<string>[] = [];
  typeName: string;
  id: number = 0;
  constructor(private vehicleservice: VehicleService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.params);
    this.route.params.subscribe(data => {

      if (data.id == undefined) {


        this.init(null);

      } else {
        this.id = data.id;
        this.vehicleservice.getvehicleTypeidUrl(this.id).subscribe(result => {

          this.typeName = result.typeName;

          this.vehicleservice.getvehicleProperty(this.id).subscribe(m => {
            this.init(m);

          })

        });

      }
    })

  }
  init(vehicleProperties: VehicleProperty[]) {

    this.getFormInit(vehicleProperties).subscribe(
      result => {
        this.controls = result;
        let group: any = {};
        this.controls.forEach(m => {
          group[m.key] = m.required ? new FormControl(m.value || '', Validators.required)
            : new FormControl(m.value || '');
          if (m.linkedControl == true) {
            group[m.key + "_1"] = new FormControl(m.linkedControlValue || 'text');

          }
        });
        this.form = new FormGroup(group);
        console.log(this.form.value);
      }
    );

  }
  onSubmit() {

    if (this.typeName == "") {

      return;
    }

    if (this.id == 0) {
      this.vehicleservice.addVehicletype({ id: 0, typeName: this.typeName }).subscribe(result => {

        this.id = result.value;
        var formData: any = this.form.value;
        this.saveProcess(formData);

      });
    } else {
      this.vehicleservice.updatevehicleType(this.id, { id: Number(this.id), typeName: this.typeName }).subscribe(result => {


        var formData: any = this.form.value;
        this.saveProcess(formData);
      });

    }

  }

  saveProcess(formData: any): void {

    let inputData: VehicleProperty[] = [];

    for (var prop in formData) {

      switch (prop.lastIndexOf('_')) {
        case -1: {
          inputData.push({ id: Number(prop), vehicleTypeId: Number(this.id), vehiclePropertyName: formData[prop], vehiclePropertyDataType: 'text' });
          break;
        }

        default: {
          inputData.forEach(e => {

            if (e.id == Number(prop.substring(0, prop.lastIndexOf('_')))) {
              e.vehiclePropertyDataType = formData[prop];
              console.log(Number(prop.substring(0, prop.lastIndexOf('_'))));
            }
          })

          break;
        }
      }
    }
    this.vehicleservice.changeVehicleProperties(inputData).subscribe(m => {
      inputData=m;
      this.init(inputData);

    });
  }
  getFormInit(vehicleProperties: VehicleProperty[]): Observable<any> {

    let returnValue: BaseControl<string>[] = [];

    let i: number = 0;

    let hasNewRow: boolean = false;

    if (vehicleProperties != null) {
      vehicleProperties.forEach(m => {

        if (m.id == -1) {
          hasNewRow = true;
          returnValue.push(new Textbox({
            key: m.id,
            linkedControl: true,
            linkedControlValue: m.vehiclePropertyDataType,
            label: 'NewProperty',
            value: m.vehiclePropertyName,
            required: false,
            order: i++
          }));
        } else {
          returnValue.push(new Textbox({
            key: m.id,
            linkedControl: true,
            linkedControlValue: m.vehiclePropertyDataType,
            label: m.id,
            value: m.vehiclePropertyName,
            required: false,
            order: i++
          }));

        }



      });

    }
    if (hasNewRow == false) {
      returnValue.push(new Textbox({
        key: -1,
        linkedControl: true,
        linkedControlValue: 'text',
        label: 'NewProperty',
        value: '',
        required: false,
        order: i++
      }));

    }

    return of(returnValue.sort((a, b) => a.order - b.order));
  }


}
