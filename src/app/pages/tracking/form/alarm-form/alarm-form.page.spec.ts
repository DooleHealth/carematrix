import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlarmFormPage } from './alarm-form.page';

describe('AlarmFormPage', () => {
  let component: AlarmFormPage;
  let fixture: ComponentFixture<AlarmFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlarmFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
