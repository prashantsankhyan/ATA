import { TestBed } from '@angular/core/testing';

import { SaveLoginUser } from './save-login-user';

describe('SaveLoginUser', () => {
  let service: SaveLoginUser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveLoginUser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
