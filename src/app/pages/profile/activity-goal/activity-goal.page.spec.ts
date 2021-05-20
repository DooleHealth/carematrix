import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivityGoalPage } from './activity-goal.page';

describe('ActivityGoalPage', () => {
  let component: ActivityGoalPage;
  let fixture: ComponentFixture<ActivityGoalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityGoalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityGoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
