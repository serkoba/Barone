import { TestBed, inject } from '@angular/core/testing';

import { CoccionesService } from './cocciones.service';

describe('CoccionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoccionesService]
    });
  });

  it('should be created', inject([CoccionesService], (service: CoccionesService) => {
    expect(service).toBeTruthy();
  }));
});
