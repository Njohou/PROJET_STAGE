import { TestBed } from '@angular/core/testing';

import { OtherServiceService } from './other-service.service';

describe('OtherServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtherServiceService = TestBed.get(OtherServiceService);
    expect(service).toBeTruthy();
  });
});
