import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrugAddPage } from './drug-add.page';

describe('DrugAddPage', () => {
  let component: DrugAddPage;
  let fixture: ComponentFixture<DrugAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrugAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
