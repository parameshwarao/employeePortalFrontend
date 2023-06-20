import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskMangementComponent } from './risk-mangement.component';

describe('RiskMangementComponent', () => {
  let component: RiskMangementComponent;
  let fixture: ComponentFixture<RiskMangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskMangementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
