import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { QuitarModalPage } from './quitar-modal.page';

describe('QuitarModalPage', () => {
  let component: QuitarModalPage;
  let fixture: ComponentFixture<QuitarModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QuitarModalPage],
    }).compileComponents();

    fixture = TestBed.createComponent(QuitarModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
