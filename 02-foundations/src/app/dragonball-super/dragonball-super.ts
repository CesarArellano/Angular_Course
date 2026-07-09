import { Component, computed, signal } from '@angular/core';
import { CharacterListComponent } from "../components/dragonball/character-list/character-list";
import { Character } from "../interfaces/character.interface";
import { CharacterAddForm } from "../components/dragonball/character-add-form/character-add-form";

@Component({
  templateUrl: './dragonball-super.html',
  styleUrl: './dragonball-super.css',
  imports: [CharacterListComponent, CharacterListComponent, CharacterAddForm],
})
export class DragonballSuperComponent {
  addCharacter(character: Character) {
    this.characters.update((characters) => [
      ...characters,
      character,
    ]);
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
