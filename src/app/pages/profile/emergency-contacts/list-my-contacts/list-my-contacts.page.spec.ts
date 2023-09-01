import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListMyContactsPage } from './list-my-contacts.page';

describe('ListMyContactsPage', () => {
  let component: ListMyContactsPage;
  let fixture: ComponentFixture<ListMyContactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMyContactsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListMyContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
