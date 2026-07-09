import { Component, computed, signal } from '@angular/core';
import { CharacterListComponent } from "../components/dragonball/character-list/character-list";
import { Character } from "../interfaces/character.interface";

@Component({
  selector: 'app-dragonball-super',
  imports: [CharacterListComponent, CharacterListComponent],
  templateUrl: './dragonball-super.html',
  styleUrl: './dragonball-super.css',
})
export class DragonballSuperComponent {
  name = signal('');
  power = signal(0);

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power(),
    };
    
    this.characters.update((characters) => [
      ...characters,
      newCharacter,
    ]);
    
    this.resetFields();
  }
  
  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
  
  characters = signal<Character[]>([
    {
      id: 1,
      name: 'Goku',
      power: 9001
    },
    {
      id: 2,
      name: 'Vegeta',
      power: 8000
    }
  ])

  powerClasses = computed(() => {
    return {
      'text-dark': true,
    }
  })
}
