import { TestBed, inject } from '@angular/core/testing';

import { MycasesService } from './mycases.service';

describe('MycasesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MycasesService]
    });
  });

  it('should be created', inject([MycasesService], (service: MycasesService) => {
    expect(service).toBeTruthy();
  }));
});
