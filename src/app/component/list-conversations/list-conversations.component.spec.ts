import { TranslatorService } from './../../providers/translator.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListConversationsComponent } from './list-conversations.component';

describe('ListConversationsComponent', () => {
  let component: ListConversationsComponent;
  let fixture: ComponentFixture<ListConversationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConversationsComponent ],
      providers:[
        TranslatorService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
