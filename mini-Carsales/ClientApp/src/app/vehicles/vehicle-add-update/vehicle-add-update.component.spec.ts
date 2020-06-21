import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAddUpdateComponent } from './vehicle-add-update.component';

describe('VehicleAddUpdateComponent', () => {
  let component: VehicleAddUpdateComponent;
  let fixture: ComponentFixture<VehicleAddUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleAddUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
