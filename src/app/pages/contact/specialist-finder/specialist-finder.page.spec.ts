import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpecialistFinderPage } from './specialist-finder.page';

describe('SpecialistFinderPage', () => {
  let component: SpecialistFinderPage;
  let fixture: ComponentFixture<SpecialistFinderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialistFinderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialistFinderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
