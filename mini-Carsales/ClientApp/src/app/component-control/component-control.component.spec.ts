import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentControlComponent } from './component-control.component';

describe('ComponentControlComponent', () => {
  let component: ComponentControlComponent;
  let fixture: ComponentFixture<ComponentControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
