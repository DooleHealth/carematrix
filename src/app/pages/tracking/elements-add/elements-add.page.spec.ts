import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElementsAddPage } from './elements-add.page';

describe('ElementsAddPage', () => {
  let component: ElementsAddPage;
  let fixture: ComponentFixture<ElementsAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementsAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElementsAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
