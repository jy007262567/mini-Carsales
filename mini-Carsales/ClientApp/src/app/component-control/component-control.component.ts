import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseControl } from 'src/app/services/data-types/BaseControl';

@Component({
  selector: 'app-component-control',
  templateUrl: './component-control.component.html',
})
export class ComponentControlComponent {
  @Input() public control: BaseControl<string>;
  @Input() public form: FormGroup;

  @Output()  private  outer=new EventEmitter();
  
  get isValid() { 

    if(this.control.key=="VehicleTypeId"){
      return true;
    }
    return this.form.controls[this.control.key].valid; 
  
  }

  onChange(value:string):void{

    this.outer.emit(value);
  }
}
