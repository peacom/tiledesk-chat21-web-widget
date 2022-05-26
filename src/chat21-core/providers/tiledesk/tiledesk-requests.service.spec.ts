import { TestBed, inject } from '@angular/core/testing';

import { TiledeskRequestsService } from './tiledesk-requests.service';

describe('TiledeskRequestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiledeskRequestsService]
    });
  });

  it('should be created', inject([TiledeskRequestsService], (service: TiledeskRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
