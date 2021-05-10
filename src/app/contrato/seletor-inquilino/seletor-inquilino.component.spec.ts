import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SeletorInquilinoComponent } from './seletor-inquilino.component';

describe('SeletorInquilinoComponent', () => {
  let component: SeletorInquilinoComponent;
  let fixture: ComponentFixture<SeletorInquilinoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SeletorInquilinoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeletorInquilinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
