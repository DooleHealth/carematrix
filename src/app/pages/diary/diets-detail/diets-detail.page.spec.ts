import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DietsDetailPage } from './diets-detail.page';

describe('DietsDetailPage', () => {
  let component: DietsDetailPage;
  let fixture: ComponentFixture<DietsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietsDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DietsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
