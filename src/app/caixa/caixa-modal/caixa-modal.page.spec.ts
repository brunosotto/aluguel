import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CaixaModalPage } from './caixa-modal.page';

describe('CaixaModalPage', () => {
  let component: CaixaModalPage;
  let fixture: ComponentFixture<CaixaModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CaixaModalPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CaixaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
