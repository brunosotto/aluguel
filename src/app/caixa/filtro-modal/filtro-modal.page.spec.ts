import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FiltroModalPage } from './filtro-modal.page';

describe('FiltroModalPage', () => {
  let component: FiltroModalPage;
  let fixture: ComponentFixture<FiltroModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroModalPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
