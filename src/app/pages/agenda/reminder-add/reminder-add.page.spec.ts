import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReminderAddPage } from './reminder-add.page';

describe('ReminderAddPage', () => {
  let component: ReminderAddPage;
  let fixture: ComponentFixture<ReminderAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReminderAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
