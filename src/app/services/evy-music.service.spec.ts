import { TestBed } from '@angular/core/testing';

import { EvyMusicService } from './evy-music.service';

describe('EvyMusicService', () => {
  let service: EvyMusicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvyMusicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
