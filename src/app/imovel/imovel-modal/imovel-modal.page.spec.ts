import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImovelModalPage } from './imovel-modal.page';

describe('ImovelModalPage', () => {
  let component: ImovelModalPage;
  let fixture: ComponentFixture<ImovelModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ImovelModalPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ImovelModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
