import { LoggerService } from 'src/chat21-core/providers/abstract/logger.service';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkedPipe } from '../../../directives/marked.pipe';

import { InfoMessageComponent } from './info-message.component';

describe('InfoMessageComponent', () => {
  let component: InfoMessageComponent;
  let fixture: ComponentFixture<InfoMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoMessageComponent, MarkedPipe ],
      providers: [LoggerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log('componenttt', fixture)
    expect(component).toBeTruthy();
  });
});
