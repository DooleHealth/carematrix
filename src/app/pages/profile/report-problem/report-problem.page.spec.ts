import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportProblemPage } from './report-problem.page';

describe('ReportProblemPage', () => {
  let component: ReportProblemPage;
  let fixture: ComponentFixture<ReportProblemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportProblemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportProblemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
