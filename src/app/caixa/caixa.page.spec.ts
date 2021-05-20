import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CaixaPage } from './caixa.page';

describe('CaixaPage', () => {
  let component: CaixaPage;
  let fixture: ComponentFixture<CaixaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CaixaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CaixaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
