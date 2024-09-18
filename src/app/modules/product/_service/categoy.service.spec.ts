import { TestBed } from '@angular/core/testing';

import { CategoyService } from './categoy.service';

describe('CategoyService', () => {
  let service: CategoyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
