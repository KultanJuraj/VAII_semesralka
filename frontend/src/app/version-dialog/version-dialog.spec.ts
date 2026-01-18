import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionDialog } from './version-dialog';

describe('VersionDialog', () => {
  let component: VersionDialog;
  let fixture: ComponentFixture<VersionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersionDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersionDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
