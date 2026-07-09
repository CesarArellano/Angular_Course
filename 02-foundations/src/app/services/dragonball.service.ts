import { Injectable, signal } from "@angular/core";
import { Character } from "../interfaces/character.interface";

@Injectable({
  providedIn: 'root'
})
export class DragonballService {
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
}