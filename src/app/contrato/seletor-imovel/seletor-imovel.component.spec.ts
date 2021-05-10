import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SeletorImovelComponent } from './seletor-imovel.component';

describe('SeletorImovelComponent', () => {
  let component: SeletorImovelComponent;
  let fixture: ComponentFixture<SeletorImovelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SeletorImovelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeletorImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
