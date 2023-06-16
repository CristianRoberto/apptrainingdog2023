import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrinciPage } from './princi.page';

describe('PrinciPage', () => {
  let component: PrinciPage;
  let fixture: ComponentFixture<PrinciPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinciPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrinciPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
