import { TestBed, inject } from '@angular/core/testing';

import { RangosService } from './rangos.service';

describe('RangosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RangosService]
    });
  });

  it('should be created', inject([RangosService], (service: RangosService) => {
    expect(service).toBeTruthy();
  }));
});
