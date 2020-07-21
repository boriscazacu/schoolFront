import { TestBed } from '@angular/core/testing';

import { GrupService } from './grup.service';

describe('StudentService', () => {
  let service: GrupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});