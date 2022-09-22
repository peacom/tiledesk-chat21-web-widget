import { DomSanitizer } from '@angular/platform-browser';
import { LoggerInstance } from './../../../../chat21-core/providers/logger/loggerInstance';
import { LoggerService } from 'src/chat21-core/providers/abstract/logger.service';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationPreviewComponent } from './conversation-preview.component';
import { LogLevel } from 'src/chat21-core/utils/constants';
const mockService = jasmine.createSpyObj('LoggerService', ['setLoggerConfig', "debug", "log", "warn", "info", "error" ]);

describe('ConversationPreviewImageComponent', () => {
  let component: ConversationPreviewComponent;
  let fixture: ComponentFixture<ConversationPreviewComponent>;
  let spy: jasmine.Spy;
  // let mockService = jasmine.Spy<LoggerService>;
  let testBedService: LoggerService;

  class MockLoggerService extends LoggerService {
    
    private logLevel: number = LogLevel.ERROR
    private isLogEnabled: boolean = true;
    
    setLoggerConfig(isLogEnabled: boolean, logLevel: string) {
      this.isLogEnabled = isLogEnabled;
      if (typeof logLevel === 'string') {
          this.logLevel = LogLevel[logLevel.toUpperCase()];
      } else {
          console.error('logLevel is not a string. See the chat21-ionic README.md')
      }
    }
    debug(...message: any[]) {
      if (this.isLogEnabled && this.logLevel >= LogLevel.DEBUG) {
        // this.logger.debug(message, ...optionalParams)
        console.debug(message)
    }
    }
    log(...message: any[]) {
      if (this.isLogEnabled && this.logLevel >= LogLevel.DEBUG) {
        // this.logger.log(message, ...optionalParams)
        console.log(message);
      }
    }
    warn(...message: any[]) {
      throw new Error('Method not implemented.');
    }
    info(...message: any[]) {
      throw new Error('Method not implemented.');
    }
    error(...message: any[]) {
      throw new Error('Method not implemented.');
    }
    
 }

  beforeEach(waitForAsync(() => {
    TestBed
    .overrideComponent(ConversationPreviewComponent, {
      set: {
        providers: [
          { provide: LoggerService, useClass: MockLoggerService }
        ]
      }
    })
    .configureTestingModule({
      declarations: [ ConversationPreviewComponent ],
      providers: [LoggerService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationPreviewComponent);
    component = fixture.componentInstance;
    let testBedService = TestBed.inject(LoggerService);
    // spyOn(logger, 'setLoggerConfig').and.callThrough();
    // spyOn(logger,"debug").and.callThrough();
    // spyOn(logger,"log").and.callThrough();
    // const service = TestBed.inject(LoggerService)
    // // const service = TestBed.inject(LoggerService) as LoggerService;
    console.log('serivceeeeee', testBedService)
    // component.logger = service
    // component.logger = LoggerInstance.setInstance(service)
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log('ConversationPreviewComponent --->', component)
    expect(component).toBeTruthy();
  });
});
