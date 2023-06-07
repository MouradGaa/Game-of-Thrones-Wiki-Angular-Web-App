import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseDialogComponent } from './house-dialog.component';

describe('HouseDialogComponent', () => {
  let component: HouseDialogComponent;
  let fixture: ComponentFixture<HouseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
