import { TestBed, inject } from '@angular/core/testing';

import { Unassignes2Service } from './unassignes2.service';

describe('Unassignes2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Unassignes2Service]
    });
  });

  it('should be created', inject([Unassignes2Service], (service: Unassignes2Service) => {
    expect(service).toBeTruthy();
  }));
});
