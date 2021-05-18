import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MydiaryPage } from './mydiary.page';

describe('MydiaryPage', () => {
  let component: MydiaryPage;
  let fixture: ComponentFixture<MydiaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydiaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MydiaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
