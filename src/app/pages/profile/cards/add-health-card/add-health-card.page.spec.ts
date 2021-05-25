import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddHealthCardPage } from './add-health-card.page';

describe('AddHealthCardPage', () => {
  let component: AddHealthCardPage;
  let fixture: ComponentFixture<AddHealthCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHealthCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddHealthCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
