import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailHealthCardPage } from './detail-health-card.page';

describe('DetailHealthCardPage', () => {
  let component: DetailHealthCardPage;
  let fixture: ComponentFixture<DetailHealthCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailHealthCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailHealthCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
