import { Component } from "@angular/core";

@Component({
  templateUrl: './counter-page.html',
  styleUrls: ['./counter-page.css']
})
export class CounterPageComponent {
  counter = 10;

  increaseBy(value: number = 1) {
    this.counter += value;
  }

  reset() {
    this.counter = 10;
  }
}