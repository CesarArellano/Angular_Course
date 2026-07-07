import { Component, signal } from "@angular/core";

@Component({
  templateUrl: './hero-page.html',
})
export class HeroPageComponent {
  name = signal("Ironman");
  age = signal(45);

  get heroDescription(): string {
    return `${this.name()} - ${this.age()}`;
  }

  changeHero(): void {
    this.name.set("Spiderman");
    this.age.set(22);
  }
  
  resetForm(): void {
    this.name.set("Ironman");
    this.age.set(45);
  }

  changeAge(): void {
    this.age.set(60);
  }
}
