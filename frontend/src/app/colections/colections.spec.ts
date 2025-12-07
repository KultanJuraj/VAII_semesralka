import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Colections } from './colections';

describe('Colections', () => {
  let component: Colections;
  let fixture: ComponentFixture<Colections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Colections]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Colections);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
