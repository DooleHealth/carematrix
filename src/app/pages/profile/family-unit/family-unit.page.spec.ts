import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FamilyUnitPage } from './family-unit.page';

describe('FamilyUnitPage', () => {
  let component: FamilyUnitPage;
  let fixture: ComponentFixture<FamilyUnitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyUnitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FamilyUnitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
