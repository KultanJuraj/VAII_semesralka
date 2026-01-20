import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCollectionView } from './public-collection-view';

describe('PublicCollectionView', () => {
  let component: PublicCollectionView;
  let fixture: ComponentFixture<PublicCollectionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicCollectionView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicCollectionView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
