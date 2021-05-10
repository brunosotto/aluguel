import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SeletorInquilinoModalPage } from './seletor-inquilino-modal.page';

describe('SeletorInquilinoModalPage', () => {
  let component: SeletorInquilinoModalPage;
  let fixture: ComponentFixture<SeletorInquilinoModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SeletorInquilinoModalPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SeletorInquilinoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
