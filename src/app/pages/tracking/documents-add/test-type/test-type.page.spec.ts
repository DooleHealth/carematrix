import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestTypePage } from './test-type.page';

describe('TestTypePage', () => {
  let component: TestTypePage;
  let fixture: ComponentFixture<TestTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
