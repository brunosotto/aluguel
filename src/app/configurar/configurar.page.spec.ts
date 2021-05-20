import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfigurarPage } from './configurar.page';

describe('ConfigurarPage', () => {
  let component: ConfigurarPage;
  let fixture: ComponentFixture<ConfigurarPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurarPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
