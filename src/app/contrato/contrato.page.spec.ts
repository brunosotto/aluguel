import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ContratoPage } from './contrato.page';

describe('ContratoPage', () => {
  let component: ContratoPage;
  let fixture: ComponentFixture<ContratoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContratoPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ContratoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
