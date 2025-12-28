import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitySelctor } from './quantity-selctor';

describe('QuantitySelctor', () => {
  let component: QuantitySelctor;
  let fixture: ComponentFixture<QuantitySelctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantitySelctor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantitySelctor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
