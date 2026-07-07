import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dragonball } from './dragonball';

describe('Dragonball', () => {
  let component: Dragonball;
  let fixture: ComponentFixture<Dragonball>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dragonball],
    }).compileComponents();

    fixture = TestBed.createComponent(Dragonball);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
