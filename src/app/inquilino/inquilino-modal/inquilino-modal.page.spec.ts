import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InquilinoModalPage } from './inquilino-modal.page';

describe('InquilinoModalPage', () => {
  let component: InquilinoModalPage;
  let fixture: ComponentFixture<InquilinoModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InquilinoModalPage],
    }).compileComponents();

    fixture = TestBed.createComponent(InquilinoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
