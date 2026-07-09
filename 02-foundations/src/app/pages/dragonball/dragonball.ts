import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball',
  imports: [],
  templateUrl: './dragonball.html',
  styleUrl: './dragonball.css',
})
export class DragonballComponent {
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
    },
    {
      id: 3,
      name: 'Gohan',
      power: 7000
    },
    {
      id: 4,
      name: 'Piccolo',
      power: 6000
    },
    {
      id: 5,
      name: 'Trunks',
      power: 5000
    },
    {
      id: 6,
      name: 'Yamcha',
      power: 500,
    }
  ])

  powerClasses = computed(() => {
    return {
      'text-dark': true,
    }
  })
}
