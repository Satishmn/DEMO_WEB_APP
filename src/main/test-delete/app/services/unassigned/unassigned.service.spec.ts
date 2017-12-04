import { TestBed, inject } from '@angular/core/testing';

import { UnassignedService } from './unassigned.service';

describe('UnassignedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnassignedService]
    });
  });

  it('should be created', inject([UnassignedService], (service: UnassignedService) => {
    expect(service).toBeTruthy();
  }));
});
