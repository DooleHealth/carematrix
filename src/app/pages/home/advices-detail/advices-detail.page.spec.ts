import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdvicesDetailPage } from './advices-detail.page';

describe('AdvicesDetailPage', () => {
  let component: AdvicesDetailPage;
  let fixture: ComponentFixture<AdvicesDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvicesDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdvicesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
