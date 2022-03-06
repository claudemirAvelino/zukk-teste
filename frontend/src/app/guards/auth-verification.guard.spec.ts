import { TestBed } from '@angular/core/testing';

import { AuthVerificationGuard } from './auth-verification.guard';

describe('AuthVerificationGuard', () => {
  let guard: AuthVerificationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthVerificationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
