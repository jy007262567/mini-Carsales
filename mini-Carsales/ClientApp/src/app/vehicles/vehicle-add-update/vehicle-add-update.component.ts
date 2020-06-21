import { Component, OnInit, Input } from '@angular/core';
import { BaseControl } from 'src/app/services/data-types/basecontrol';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VehicleProperty, VehicleType, VehicleView, PropertyDataView } from 'src/app/services/data-types/common.types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-add-update',
  templateUrl: './vehicle-add-update.component.html'
})
export class VehicleAddUpdateComponent implements OnInit {

  controls: BaseControl<string>[] = [];
  form: FormGroup;
  
  payLoad = '';
  public vehicleProperties: VehicleProperty[] = [];
  public vehicleTypes: VehicleType[] = [];
  public vehicleDetail: VehicleView;
  private id:number=0;
  constructor(private vehicleservice: VehicleService, private route: ActivatedRoute,private router1:Router) {
  }

  ngOnInit() {

    console.log(this.route.params);
    this.route.params.subscribe(data => {

      if(data.id ==undefined){
        let typeId: number = 1;
        this.formInit(typeId);

      }else{

        this.id=data.id
        this.vehicleservice.getvehicleDetail(this.id).subscribe(result => {

          this.vehicleDetail = result;
          
          this.vehicleservice.getvehicleType().subscribe(
            result => {
              this.vehicleTypes = result;

              this.vehicleservice.getModifyFormInit(this.vehicleDetail ,this.vehicleTypes).subscribe(
                result => {
                  console.log(result);
                  this.controls = result;
                  let group: any = {};
                  this.controls.forEach(m => {
                    group[m.key] = m.required ? new FormControl(m.value || '', Validators.required)
                      : new FormControl(m.value || '');
                  });
                  this.form = new FormGroup(group);
                  this.form.controls['VehicleTypeId'].disable();
                }
              );
            }
    
          )
    
    
        });

      }
      
    
    });


  }
  formInit(typeId:number){
    this.vehicleservice.getvehicleProperty(typeId).subscribe(result => {

      this.vehicleProperties = result;

      this.vehicleservice.getvehicleType().subscribe(
        result => {
          this.vehicleTypes = result;
          this.vehicleservice.getFormInit(this.vehicleTypes, this.vehicleProperties, typeId).subscribe(
            result => {
              console.log(result);
              this.controls = result;
              let group: any = {};
              this.controls.forEach(m => {
                group[m.key] = m.required ? new FormControl(m.value || '', Validators.required)
                  : new FormControl(m.value || '');
              });
              this.form = new FormGroup(group);
              console.log(this.form);
            }
          );
        }

      )
    })
    
  }
  onSubmit() {

    var formData: any = this.form.getRawValue();
    let inputData: VehicleView = new VehicleView();
    let inputDataProperty: PropertyDataView[] = [];
    for (var prop in formData) {

      switch (prop) {
        case "VehicleTypeId": {
          inputData.vehicleTypeId =Number( formData[prop]);
          break;
        }
        case "Make": {
          inputData.make = formData[prop];
          break;
        }
        case "Model": {
          inputData.model = formData[prop];
          break;
        }
        default: {
          inputDataProperty.push({ vehiclePropertyId: Number(prop), propertyData: formData[prop], vehicleId: 0, vehiclePropertyName: '', vehiclePropertyDataType: '' });
          break;
        }
      }

    }
    inputData.vehicleDetail = inputDataProperty;
    console.log(inputData);
    if(this.id==0){
      this.vehicleservice.addVehicle(inputData).subscribe(m=>this.router1.navigateByUrl('/'));
      
    }else{
      this.vehicleservice.updateVehicle(this.id,inputData).subscribe(m=>this.router1.navigateByUrl('/'));

    }
    
  }

  onChange(e) {

    this.formInit(e);

    console.log(e);  
   
  }
}