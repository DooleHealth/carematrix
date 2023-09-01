import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdvicesPage } from './advices.page';

describe('AdvicesPage', () => {
  let component: AdvicesPage;
  let fixture: ComponentFixture<AdvicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdvicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
