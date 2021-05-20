import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImovelPage } from './imovel.page';

describe('ImovelPage', () => {
  let component: ImovelPage;
  let fixture: ComponentFixture<ImovelPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ImovelPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ImovelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
