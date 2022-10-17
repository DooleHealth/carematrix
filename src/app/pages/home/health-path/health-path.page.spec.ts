import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HealthPathPage } from './health-path.page';

describe('HealthPathPage', () => {
  let component: HealthPathPage;
  let fixture: ComponentFixture<HealthPathPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthPathPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HealthPathPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
