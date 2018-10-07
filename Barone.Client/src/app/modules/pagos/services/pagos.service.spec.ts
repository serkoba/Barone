import { TestBed, inject } from '@angular/core/testing';

import { PagosService } from './pagos.service';

describe('PagosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagosService]
    });
  });

  it('should be created', inject([PagosService], (service: PagosService) => {
    expect(service).toBeTruthy();
  }));
});
