import { TestBed, inject } from '@angular/core/testing';

import { SnackManagerService } from './snack-manager.service';

describe('SnackManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnackManagerService]
    });
  });

  it('should be created', inject([SnackManagerService], (service: SnackManagerService) => {
    expect(service).toBeTruthy();
  }));
});
