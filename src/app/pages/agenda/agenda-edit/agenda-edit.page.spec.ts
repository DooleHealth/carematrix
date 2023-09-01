import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgendaEditPage } from './agenda-edit.page';

describe('AgendaEditPage', () => {
  let component: AgendaEditPage;
  let fixture: ComponentFixture<AgendaEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgendaEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
