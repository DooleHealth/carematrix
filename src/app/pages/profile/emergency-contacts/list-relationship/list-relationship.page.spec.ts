import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListRelationshipPage } from './list-relationship.page';

describe('ListRelationshipPage', () => {
  let component: ListRelationshipPage;
  let fixture: ComponentFixture<ListRelationshipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRelationshipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListRelationshipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
