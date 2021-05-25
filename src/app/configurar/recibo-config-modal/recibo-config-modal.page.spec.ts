import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReciboConfigModalPage } from './recibo-config-modal.page';

describe('ReciboConfigModalPage', () => {
  let component: ReciboConfigModalPage;
  let fixture: ComponentFixture<ReciboConfigModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReciboConfigModalPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ReciboConfigModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
