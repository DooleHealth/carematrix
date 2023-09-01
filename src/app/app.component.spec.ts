import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { IonicModule, Platform } from '@ionic/angular';

import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

  beforeEach(waitForAsync(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: Platform, useValue: platformSpy },
      ],
      imports: [IonicModule, RouterTestingModule.withRoutes([])],
    }).compileComponents();


    it('should create the app', async () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });

    it('should initialize the app', async () => {
      TestBed.createComponent(AppComponent);
      expect(platformSpy.ready).toHaveBeenCalled();
      await platformReadySpy;
      expect(statusBarSpy.styleDefault).toHaveBeenCalled();
      expect(splashScreenSpy.hide).toHaveBeenCalled();
    });

    it('should have menu labels', async () => {
      const fixture = await TestBed.createComponent(AppComponent);
      await fixture.detectChanges();
      const app = fixture.nativeElement;
      const menuItems = app.querySelectorAll('ion-label');
      expect(menuItems.length).toEqual(12);
      expect(menuItems[0].textContent).toContain('Inbox');
      expect(menuItems[1].textContent).toContain('Outbox');
    });

    it('should have urls', async () => {
      const fixture = await TestBed.createComponent(AppComponent);
      await fixture.detectChanges();
      const app = fixture.nativeElement;
      const menuItems = app.querySelectorAll('ion-item');
      expect(menuItems.length).toEqual(12);
      expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/folder/Inbox');
      expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/folder/Outbox');
    });
}));

});
