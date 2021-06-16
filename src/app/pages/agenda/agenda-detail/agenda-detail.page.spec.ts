import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgendaDetailPage } from './agenda-detail.page';

describe('AgendaDetailPage', () => {
  let component: AgendaDetailPage;
  let fixture: ComponentFixture<AgendaDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgendaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
