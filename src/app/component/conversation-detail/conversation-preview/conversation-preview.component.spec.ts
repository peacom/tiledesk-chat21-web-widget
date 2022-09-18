import { LoggerInstance } from './../../../../chat21-core/providers/logger/loggerInstance';
import { LoggerService } from 'src/chat21-core/providers/abstract/logger.service';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationPreviewComponent } from './conversation-preview.component';

describe('ConversationPreviewImageComponent', () => {
  let component: ConversationPreviewComponent;
  let fixture: ComponentFixture<ConversationPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationPreviewComponent ],
      providers: [LoggerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationPreviewComponent);
    component = fixture.componentInstance;
    // component.logger = LoggerInstance.getInstance()
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log('ConversationPreviewComponent --->', component)
    expect(component).toBeTruthy();
  });
});
