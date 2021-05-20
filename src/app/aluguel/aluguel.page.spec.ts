import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AluguelPage } from './aluguel.page';

describe('AluguelPage', () => {
  let component: AluguelPage;
  let fixture: ComponentFixture<AluguelPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AluguelPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AluguelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
