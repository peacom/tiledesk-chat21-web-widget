import { Triggerhandler } from './../chat21-core/utils/triggerHandler';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { GlobalSettingsService } from './providers/global-settings.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppStorageService } from 'src/chat21-core/providers/abstract/app-storage.service';
import { SettingsSaverService } from './providers/settings-saver.service';
import { TranslatorService } from './providers/translator.service';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers:[
        Triggerhandler,
        GlobalSettingsService,
        AppStorageService,
        SettingsSaverService,
        TranslatorService
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'widget'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('widget');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to widget!');
  });
});
