import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SeletorContratoModalPage } from './seletor-contrato-modal.page';

describe('SeletorContratoModalPage', () => {
  let component: SeletorContratoModalPage;
  let fixture: ComponentFixture<SeletorContratoModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SeletorContratoModalPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SeletorContratoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
