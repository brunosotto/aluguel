import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ContratoModalPage } from './contrato-modal.page';

describe('ContratoModalPage', () => {
  let component: ContratoModalPage;
  let fixture: ComponentFixture<ContratoModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContratoModalPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ContratoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
