import { TestBed, inject } from '@angular/core/testing';

import { FermentadorService } from './fermentador.service';

describe('FermentadorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FermentadorService]
    });
  });

  it('should be created', inject([FermentadorService], (service: FermentadorService) => {
    expect(service).toBeTruthy();
  }));
});
