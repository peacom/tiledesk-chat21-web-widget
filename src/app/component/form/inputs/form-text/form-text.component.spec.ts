import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroupDirective } from '@angular/forms';

import { FormTextComponent } from './form-text.component';

describe('FormTextComponent', () => {
  let component: FormTextComponent;
  let fixture: ComponentFixture<FormTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTextComponent ],
      providers: [ FormGroupDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
