import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicalCalendarPage } from './medical-calendar.page';

describe('MedicalCalendarPage', () => {
  let component: MedicalCalendarPage;
  let fixture: ComponentFixture<MedicalCalendarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalCalendarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalCalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
