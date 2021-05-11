import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AluguelModalPage } from './aluguel-modal.page';

describe('AluguelModalPage', () => {
  let component: AluguelModalPage;
  let fixture: ComponentFixture<AluguelModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AluguelModalPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AluguelModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
