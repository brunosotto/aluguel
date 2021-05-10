import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SeletorImovelModalPage } from './seletor-imovel-modal.page';

describe('SeletorImovelModalPage', () => {
  let component: SeletorImovelModalPage;
  let fixture: ComponentFixture<SeletorImovelModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SeletorImovelModalPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SeletorImovelModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
