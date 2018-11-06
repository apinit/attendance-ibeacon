import { TestBed, async, inject } from '@angular/core/testing';

import { ProtectBackwardGuard } from './protect-backward.guard';

describe('ProtectBackwardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProtectBackwardGuard]
    });
  });

  it('should ...', inject([ProtectBackwardGuard], (guard: ProtectBackwardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
