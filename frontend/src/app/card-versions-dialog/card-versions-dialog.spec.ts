import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVersionsDialog } from './card-versions-dialog';

describe('CardVersionsDialog', () => {
  let component: CardVersionsDialog;
  let fixture: ComponentFixture<CardVersionsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardVersionsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardVersionsDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
