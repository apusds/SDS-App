import { TestBed } from '@angular/core/testing';

import { SDAuthService } from './sdauth.service';

describe('SDAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SDAuthService = TestBed.get(SDAuthService);
    expect(service).toBeTruthy();
  });
});
