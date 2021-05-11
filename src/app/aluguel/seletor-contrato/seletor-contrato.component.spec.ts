import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SeletorContratoComponent } from './seletor-contrato.component';

describe('SeletorContratoComponent', () => {
  let component: SeletorContratoComponent;
  let fixture: ComponentFixture<SeletorContratoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SeletorContratoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeletorContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
