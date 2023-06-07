import { TestBed } from '@angular/core/testing';

import { HttpGotService } from './http-got.service';

describe('HttpGotService', () => {
  let service: HttpGotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpGotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
