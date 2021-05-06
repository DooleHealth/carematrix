import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SmsPage } from './sms.page';

describe('SmsPage', () => {
  let component: SmsPage;
  let fixture: ComponentFixture<SmsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
