import { TestBed, inject } from '@angular/core/testing';

import { APIInterceptorService } from './apiinterceptor.service';

describe('APIInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APIInterceptorService]
    });
  });

  it('should be created', inject([APIInterceptorService], (service: APIInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
