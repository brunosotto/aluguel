import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InquilinoPage } from './inquilino.page';

describe('InquilinoPage', () => {
  let component: InquilinoPage;
  let fixture: ComponentFixture<InquilinoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InquilinoPage],
    }).compileComponents();

    fixture = TestBed.createComponent(InquilinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
