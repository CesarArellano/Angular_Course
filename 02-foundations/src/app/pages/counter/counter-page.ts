import { Component } from "@angular/core";

@Component({
  template: `
    <div>
      <h1>Counter Page</h1>
      <p>Counter: {{ counter }}</p>
      <button (click)="increaseBy()">+1</button>
    </div>
  `
})
export class CounterPageComponent {
  counter = 10;

  increaseBy(value: number = 1) {
    this.counter += value;
  }
}