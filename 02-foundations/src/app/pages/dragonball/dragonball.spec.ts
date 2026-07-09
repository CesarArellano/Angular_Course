import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonballComponent } from './dragonball';

describe('Dragonball', () => {
  let component: DragonballComponent;
  let fixture: ComponentFixture<DragonballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragonballComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DragonballComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
