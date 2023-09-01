import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GamesDetailPage } from './games-detail.page';

describe('GamesDetailPage', () => {
  let component: GamesDetailPage;
  let fixture: ComponentFixture<GamesDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GamesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
