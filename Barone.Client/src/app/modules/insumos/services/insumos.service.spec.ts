import { TestBed, inject } from '@angular/core/testing';

import { InsumosService } from './insumos.service';

describe('InsumosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsumosService]
    });
  });

  it('should be created', inject([InsumosService], (service: InsumosService) => {
    expect(service).toBeTruthy();
  }));
});
