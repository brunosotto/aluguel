import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RestoreModalPage } from './restore-modal.page';

describe('RestoreModalPage', () => {
  let component: RestoreModalPage;
  let fixture: ComponentFixture<RestoreModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RestoreModalPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RestoreModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
