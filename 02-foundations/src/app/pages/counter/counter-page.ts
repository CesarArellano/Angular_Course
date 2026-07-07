import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
  templateUrl: './counter-page.html',
  styleUrls: ['./counter-page.css'],
})
export class CounterPageComponent {
  counter = 10;
  counterSignal = signal(10);

  constructor() {
    setInterval(() => {
      this.counterSignal.update(current => current + 1);
      console.log('tick');
    }, 2000);
  }

  increaseBy(value: number = 1) {
    this.counter += value;
    this.counterSignal.update(current => current + value);
  }

  reset() {
    this.counter = 0;
    this.counterSignal.set(0);
  }
}