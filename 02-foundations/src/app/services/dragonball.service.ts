import { effect, Injectable, signal } from "@angular/core";
import { Character } from "../interfaces/character.interface";

const STORAGE_KEY = 'dragonball-characters';

const loadFromLocalStorage = (): Character[] => {
  const characters = localStorage.getItem(STORAGE_KEY);
  return characters ? JSON.parse(characters) : [];
}
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

  saveToLocalStorage = effect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.characters()));
  })
  
  characters = signal<Character[]>(loadFromLocalStorage())
}