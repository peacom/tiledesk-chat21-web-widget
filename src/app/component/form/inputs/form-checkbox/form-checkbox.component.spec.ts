import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroupDirective } from '@angular/forms';

import { FormCheckboxComponent } from './form-checkbox.component';

describe('FormCheckboxComponent', () => {
  let component: FormCheckboxComponent;
  let fixture: ComponentFixture<FormCheckboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCheckboxComponent ],
      providers: [ FormGroupDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
