import { TestBed } from '@angular/core/testing';

import { InquilinoService } from './inquilino.service';

describe('InquilinoService', () => {
  let service: InquilinoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InquilinoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
