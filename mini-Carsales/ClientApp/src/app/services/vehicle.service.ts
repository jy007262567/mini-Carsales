import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { VehicleView } from './data-types/common.types';
import { BaseControl } from './data-types/basecontrol';
import { VehicleProperty } from './data-types/common.types';
import { Textbox } from './data-types/textbox';
import { Dropdown } from './data-types/dropdown';
import { VehicleType } from './data-types/common.types';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private url: string = "http://localhost:53084/api/vehicle/"
  constructor(private http: HttpClient) { }

  private getvehiclesUrl: string = this.url + "getvehicles";

  private getvehicledetailUrl: string = this.url + "getvehicledetail/";

  private getvehiclepropertyUrl: string = this.url + "getvehicleproperty/";

  private getvehicletypeidUrl: string = this.url + "getvehicletypeid/";

  private getvehicletypeUrl: string = this.url + "getvehicletype";

  private addVehicleUrl: string = this.url + "addvehicle";

  private updatevehicleUrl: string = this.url + "updatevehicle/";

  private updatevehicletypeUrl: string = this.url + "updatevehicletype/";

  private deletevehicleUrl: string = this.url + "deletevehicle/";

  private addvehicletypeUrl: string = this.url + "addvehicletype";

  private changevehiclepropertiesUrl: string = this.url + "changevehicleproperties";

  private vehicle$: Observable<VehicleView[]>;


  getVehicles(): Observable<VehicleView[]> {
    if (!this.vehicle$) {
      this.vehicle$ = this.http.get<VehicleView[]>(this.getvehiclesUrl);
    }
    return this.vehicle$;
  }
  getvehicleDetail(id: number): Observable<VehicleView> {

    return this.http.get<VehicleView>(this.getvehicledetailUrl + id);
  }
  

  getvehicleTypeidUrl(id: number): Observable<VehicleType> {
    return this.http.get<VehicleType>(this.getvehicletypeidUrl + id);
  }

  getvehicleProperty(id: number): Observable<VehicleProperty[]> {
    return this.http.get<VehicleProperty[]>(this.getvehiclepropertyUrl + id);
  }

  getvehicleType(): Observable<any> {
    return this.http.get(this.getvehicletypeUrl);
  }

  getFormInit(vehicleTypes: VehicleType[], vehicleProperties: VehicleProperty[], typeId: number): Observable<any> {

    let returnValue: BaseControl<string>[] = [];
    let typeOptions: any[] = [];

    vehicleTypes.forEach(m => {
      typeOptions.push({ key: m.id, value: m.typeName });
    })
    let i: number = 0;
    returnValue.push(new Dropdown({
      key: 'VehicleTypeId',
      value: typeId,
      label: 'TypeName',
      options: typeOptions,
      disabled: false,
      order: i++
    }));


    returnValue.push(new Textbox({
      key: 'Make',
      label: 'Make',
      value: '',
      required: true,
      order: i++
    }));
    returnValue.push(new Textbox({
      key: 'Model',
      label: 'Model',
      value: '',
      required: true,
      order: i++
    }));
    vehicleProperties.forEach(m => {

      returnValue.push(new Textbox({
        key: m.id,
        label: m.vehiclePropertyName,
        value: '',
        required: true,
        type: m.vehiclePropertyDataType,
        order: i++
      }));

    });

    return of(returnValue.sort((a, b) => a.order - b.order));
  }
  getModifyFormInit(vehicleDetail: VehicleView, vehicleTypes: VehicleType[]): Observable<any> {

    let returnValue: BaseControl<string>[] = [];
    let typeOptions: any[] = [];

    vehicleTypes.forEach(m => {
      typeOptions.push({ key: m.id, value: m.typeName });
    })
    let i: number = 0;
    returnValue.push(new Dropdown({
      key: 'VehicleTypeId',
      value: vehicleDetail.vehicleTypeId,
      label: 'TypeName',
      required: false,
      options: typeOptions,
      order: i++
    }));


    returnValue.push(new Textbox({
      key: 'Make',
      label: 'Make',
      value: vehicleDetail.make,
      required: true,
      order: i++
    }));
    returnValue.push(new Textbox({
      key: 'Model',
      label: 'Model',
      value: vehicleDetail.model,
      required: true,
      order: i++
    }));
    vehicleDetail.vehicleDetail.forEach(m => {

      returnValue.push(new Textbox({
        key: m.vehiclePropertyId,
        label: m.vehiclePropertyName,
        value: m.propertyData,
        required: true,
        type: m.vehiclePropertyDataType,
        order: i++
      }));

    });

    return of(returnValue.sort((a, b) => a.order - b.order));
  }

  addVehicle(newVehicle: VehicleView): Observable<VehicleView> {
    return this.http.post<VehicleView>(this.addVehicleUrl, newVehicle);
  }

  updateVehicle(id: number, updateVehicle: VehicleView): Observable<VehicleView> {
    return this.http.put<VehicleView>(this.updatevehicleUrl + id, updateVehicle);
  }

  updatevehicleType(id: number, updatevehicleType: VehicleType): Observable<VehicleType> {
    return this.http.put<VehicleType>(this.updatevehicletypeUrl + id, updatevehicleType);
  }


  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(this.deletevehicleUrl + id);
  }
  addVehicletype(newVehicletype: VehicleType): Observable<any> {
    return this.http.post<any>(this.addvehicletypeUrl, newVehicletype);
  }
  changeVehicleProperties(vehicleProperties: VehicleProperty[]): Observable<VehicleProperty[]> {
    return this.http.post<VehicleProperty[]>(this.changevehiclepropertiesUrl, vehicleProperties);
  }

}
