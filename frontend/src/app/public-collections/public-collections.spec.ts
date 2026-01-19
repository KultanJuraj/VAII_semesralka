import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCollections } from './public-collections';

describe('PublicCollections', () => {
  let component: PublicCollections;
  let fixture: ComponentFixture<PublicCollections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicCollections]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicCollections);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
