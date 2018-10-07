import { TestBed, inject } from '@angular/core/testing';

import { EstilosService } from './estilos.service';

describe('EstilosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstilosService]
    });
  });

  it('should be created', inject([EstilosService], (service: EstilosService) => {
    expect(service).toBeTruthy();
  }));
});
