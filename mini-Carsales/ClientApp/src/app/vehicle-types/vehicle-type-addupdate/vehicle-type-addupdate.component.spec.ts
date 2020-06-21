import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeAddupdateComponent } from './vehicle-type-addupdate.component';

describe('VehicleTypeAddupdateComponent', () => {
  let component: VehicleTypeAddupdateComponent;
  let fixture: ComponentFixture<VehicleTypeAddupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTypeAddupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeAddupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
