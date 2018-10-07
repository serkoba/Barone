import { TestBed, inject } from '@angular/core/testing';

import { BarrilesService } from './barriles.service';

describe('BarrilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarrilesService]
    });
  });

  it('should be created', inject([BarrilesService], (service: BarrilesService) => {
    expect(service).toBeTruthy();
  }));
});
